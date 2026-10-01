import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductSizeDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
