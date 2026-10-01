import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductCategoryDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
