import { ProductEntity } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity()
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  amountCents: number;

  @ManyToOne(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  order: OrderEntity;
}
