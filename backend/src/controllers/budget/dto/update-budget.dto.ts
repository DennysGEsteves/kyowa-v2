import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { BudgetClosingAt } from '../../../entities/budget/types/budget-closing-at';
import { BudgetClosingLevel } from '../../../entities/budget/types/budget-closing-level';
import { BudgetStatus } from '../../../entities/budget/types/budget-status';
import { BudgetCheckoutItemDto } from './budget-checkout-item.dto';

export class UpdateBudgetDto {
  @IsOptional()
  @IsMongoId()
  readonly clientId?: string | null;

  @IsOptional()
  @IsMongoId()
  readonly storeId?: string;

  @IsOptional()
  @IsMongoId()
  readonly architectId?: string | null;

  @IsOptional()
  @IsString()
  readonly obs?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly lostReasons?: string | null;

  @IsOptional()
  @IsEnum(BudgetStatus)
  readonly status?: BudgetStatus;

  @IsOptional()
  @IsEnum(BudgetClosingAt)
  readonly closingAt?: BudgetClosingAt | null;

  @IsOptional()
  @IsEnum(BudgetClosingLevel)
  readonly closingLevel?: BudgetClosingLevel | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BudgetCheckoutItemDto)
  readonly checkout?: BudgetCheckoutItemDto[];
}
