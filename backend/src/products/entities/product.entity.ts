import { OrderItemEntity } from 'src/orders/entities/order-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  amountCents: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItem: OrderItemEntity[];
}
