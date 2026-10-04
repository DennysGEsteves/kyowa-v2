import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdateProductsPriceUseCaseDto {
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  readonly value: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly providerName?: string;

  @IsOptional()
  @IsMongoId()
  readonly categoryId?: string;
}
