import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import {
  calculateAmountSubTotal,
  calculateShippingCost,
  calculateTax,
  mapOrderToCredipayBody,
} from 'src/utils/order.utils';
import { OrderItemEntity } from './entities/order-item.entity';
import { CredipayClientService } from 'src/credipay-client/credipay-client.service';
import { ConfigService } from '@nestjs/config';
import { ProductEntity } from 'src/products/entities/product.entity';
import { CredipayOrderResponse } from 'src/types/order';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    private credipayClientService: CredipayClientService,
    private productsService: ProductsService,
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}

  private async addOrderAndItemsToDb(
    createOrderDto: CreateOrderDto,
    products: ProductEntity[],
  ): Promise<OrderEntity> {
    const subtotalAmountCents = calculateAmountSubTotal(
      createOrderDto.items.map((item) => ({
        ...item,
        product: products.find((product) => product.id === item.productId),
      })),
    );

    const taxAmountCents = calculateTax(subtotalAmountCents);

    const shippingCostCents = calculateShippingCost();

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    let order: OrderEntity | null = null;

    try {
      order = await queryRunner.manager.save(OrderEntity, {
        ...createOrderDto,
        subtotalAmountCents,
        taxAmountCents,
        shippingCostCents,
      });

      for (const item of createOrderDto.items) {
        const product = products.find(
          (product) => product.id === item.productId,
        );

        await queryRunner.manager.insert(OrderItemEntity, {
          quantity: item.quantity,
          amountCents: product.amountCents,
          product,
          order,
        });
      }
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    if (!order) {
      throw new InternalServerErrorException();
    }

    return await this.ordersRepository.findOne({
      where: { id: order.id },
      relations: {
        items: {
          product: true,
        },
      },
    });
  }

  async create(createOrderDto: CreateOrderDto): Promise<CredipayOrderResponse> {
    const products = await this.productsService.findAll(
      createOrderDto.items.map((item) => item.productId),
    );

    const order = await this.addOrderAndItemsToDb(createOrderDto, products);

    const credipayOrder = await this.credipayClientService.createCredipayOrder(
      mapOrderToCredipayBody(
        order,
        this.configService.getOrThrow('sellerTaxId'),
      ),
    );

    return credipayOrder;
  }

  async findOne(id: number): Promise<OrderEntity> {
    return this.ordersRepository.findOneBy({ id });
  }
}
