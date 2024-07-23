import { IsNumber, IsUrl, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @MinLength(3)
  name: string;

  @IsUrl()
  image: string;

  @IsNumber()
  @Min(1)
  amountCents: number;
}
