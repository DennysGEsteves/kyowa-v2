import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;
}
