import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductModelDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
