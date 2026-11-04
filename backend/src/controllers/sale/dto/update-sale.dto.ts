import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { SalePaymentMethod } from '../../../entities/sale/types/sale-payment-method';
import { SaleType } from '../../../entities/sale/types/sale-type';
import { SaleCheckoutItemDto } from './sale-checkout-item.dto';

export class UpdateSaleDto {
  @IsOptional()
  @IsMongoId()
  readonly clientId?: string;

  @IsOptional()
  @IsMongoId()
  readonly sellerId?: string;

  @IsOptional()
  @IsMongoId()
  readonly storeId?: string;

  @IsOptional()
  @IsMongoId()
  readonly architectId?: string | null;

  @IsOptional()
  @IsBoolean()
  readonly architectParticipation?: boolean;

  @IsOptional()
  @IsString()
  readonly obsReceipt?: string | null;

  @IsOptional()
  @IsString()
  readonly obsInternal?: string | null;

  @IsOptional()
  @IsEnum(SaleType)
  readonly type?: SaleType;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly changeCredit?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly plots?: number | null;

  @IsOptional()
  @IsEnum(SalePaymentMethod)
  readonly paymentMethod?: SalePaymentMethod | null;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly paidAt?: Date | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleCheckoutItemDto)
  readonly checkout?: SaleCheckoutItemDto[];
}
