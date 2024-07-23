import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { PaymentMethod, paymentMethod } from 'src/types/order';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  externalId?: string | undefined | null;

  @Column()
  subtotalAmountCents: number;

  @Column()
  taxAmountCents: number;

  @Column()
  shippingCostCents: number;

  @Column()
  buyerTaxId: string;

  @Column()
  paymentTerms: number;

  @Column({
    type: 'enum',
    enum: paymentMethod,
    default: 'bnpl',
  })
  paymentMethod: PaymentMethod;

  @Column({ type: 'varchar', length: 255 })
  shippingAddress1: string;

  @Column({ type: 'varchar', length: 255 })
  shippingAddress2: string;

  @Column({ type: 'varchar', length: 100 })
  shippingCity: string;

  @Column({ type: 'varchar', length: 100 })
  shippingRegion: string;

  @Column({ type: 'varchar', length: 50 })
  shippingPostalCode: string;

  @Column({ type: 'varchar', length: 50 })
  shippingCountry: string;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  items: OrderItemEntity[];
}
