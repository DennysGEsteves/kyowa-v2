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
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  fantasyName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameFilter?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  ezId?: number | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  providerId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  categoryId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  ref?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  unitId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  colorId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  sizeId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  designId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  shapeId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  originId?: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsOptional()
  @IsMongoId()
  modelId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ncm?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  cst?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ean?: string | null;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  buyPrice?: number | null;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  sellPrice?: number | null;

  @IsOptional()
  @IsBoolean()
  hasSeals?: boolean | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  amountStart?: number | null;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  amountSold?: number | null;

  @IsOptional()
  @IsBoolean()
  amountUnlimited?: boolean;
}
