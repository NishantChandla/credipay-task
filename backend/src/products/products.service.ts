import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productsRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productsRepository.save(createProductDto);
  }

  async findAll(ids?: number[] | undefined): Promise<ProductEntity[]> {
    if (ids && ids.length) {
      return this.productsRepository.find({
        where: {
          id: In(ids),
        },
      });
    }

    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
