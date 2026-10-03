import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductShapeDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly name?: string;
}
