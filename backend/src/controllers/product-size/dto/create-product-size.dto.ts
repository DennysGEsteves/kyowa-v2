import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductSizeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
