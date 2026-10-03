import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductUnitDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly name?: string;
}
