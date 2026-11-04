import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class SaleCheckoutItemDto {
  @IsBoolean()
  readonly hasSeal!: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly sealId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly value?: number | null;

  @IsOptional()
  @IsMongoId()
  readonly productId?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  readonly quantity?: number | null;

  @IsOptional()
  @IsString()
  readonly description?: string | null;

  @IsOptional()
  @IsMongoId()
  readonly orderId?: string | null;
}
