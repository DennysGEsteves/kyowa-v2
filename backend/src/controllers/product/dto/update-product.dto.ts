import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly fantasyName?: string;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly providerId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly categoryId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly ref?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly unitId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly colorId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly sizeId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly designId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly shapeId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly originId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  readonly modelId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly ncm?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly cst?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly ean?: string | null;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly buyPrice?: number | null;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly sellPrice?: number | null;

  @IsOptional()
  @IsBoolean()
  readonly hasSeals?: boolean | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  readonly amountStart?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  readonly amountSold?: number | null;

  @IsOptional()
  @IsBoolean()
  readonly amountUnlimited?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isEcommerce?: boolean;
}
