import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductShapeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
