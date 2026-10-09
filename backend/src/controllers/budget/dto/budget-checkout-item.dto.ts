import { Type } from 'class-transformer';
import {
  IsInt,
  IsMongoId,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class BudgetCheckoutItemDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly quantity!: number;

  @IsMongoId()
  readonly categoryId!: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly price!: number;

  @IsString()
  readonly description!: string;
}
