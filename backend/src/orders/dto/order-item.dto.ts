import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;
}
