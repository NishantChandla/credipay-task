import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { paymentMethod, PaymentMethod } from 'src/types/order';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsString()
  buyerTaxId: string;

  @IsNumber()
  paymentTerms: number;

  @IsEnum(paymentMethod)
  paymentMethod: PaymentMethod;

  @IsString()
  shippingAddress1: string;

  @IsString()
  shippingAddress2: string;

  @IsString()
  shippingCity: string;

  @IsString()
  shippingRegion: string;

  @IsString()
  shippingPostalCode: string;

  @IsString()
  shippingCountry: string;

  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
