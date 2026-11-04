import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { parseOptionalBoolean } from '../../../shared/util/query/parse-optional-boolean';
import { SaleType } from '../../../entities/sale/types/sale-type';

export class ListSalesPaginatedQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsDateString()
  @MaxLength(10)
  createdAtFrom?: string;

  @IsOptional()
  @IsDateString()
  @MaxLength(10)
  createdAtTo?: string;

  @IsOptional()
  @Transform(({ value }) => parseOptionalBoolean(value))
  @IsBoolean()
  isPaid?: boolean;

  @IsOptional()
  @IsEnum(SaleType)
  type?: SaleType;

  @IsOptional()
  @IsMongoId()
  clientId?: string;

  @IsOptional()
  @IsMongoId()
  sellerId?: string;

  @IsOptional()
  @IsMongoId()
  storeId?: string;

  @IsOptional()
  @IsMongoId()
  architectId?: string;
}
