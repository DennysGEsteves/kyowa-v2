import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { BudgetClosingAt } from '../../../entities/budget/types/budget-closing-at';
import { BudgetClosingLevel } from '../../../entities/budget/types/budget-closing-level';
import { BudgetStatus } from '../../../entities/budget/types/budget-status';

export class ListBudgetsPaginatedQueryDto {
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
  @IsEnum(BudgetStatus)
  status?: BudgetStatus;

  @IsOptional()
  @IsMongoId()
  userId?: string;

  @IsOptional()
  @IsMongoId()
  architectId?: string;

  @IsOptional()
  @IsMongoId()
  clientId?: string;

  @IsOptional()
  @IsMongoId()
  storeId?: string;

  @IsOptional()
  @IsEnum(BudgetClosingAt)
  closingAt?: BudgetClosingAt;

  @IsOptional()
  @IsEnum(BudgetClosingLevel)
  closingLevel?: BudgetClosingLevel;
}
