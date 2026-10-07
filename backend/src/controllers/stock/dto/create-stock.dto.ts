import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsInt,
  IsMongoId,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateStockDto {
  @IsMongoId()
  readonly productId!: string;

  @IsMongoId()
  readonly storeId!: string;

  @IsMongoId()
  readonly userId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  @IsInt({ each: true })
  @Min(1, { each: true })
  readonly sealNumbers!: number[];

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly createdAt?: Date;
}
