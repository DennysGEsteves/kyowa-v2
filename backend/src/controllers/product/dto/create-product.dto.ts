import {
  IsBoolean,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  fantasyName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameFilter?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  ezId?: number;

  @IsOptional()
  @IsMongoId()
  providerId?: string;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  ref?: string;

  @IsOptional()
  @IsMongoId()
  unitId?: string;

  @IsOptional()
  @IsMongoId()
  colorId?: string;

  @IsOptional()
  @IsMongoId()
  sizeId?: string;

  @IsOptional()
  @IsMongoId()
  designId?: string;

  @IsOptional()
  @IsMongoId()
  shapeId?: string;

  @IsOptional()
  @IsMongoId()
  originId?: string;

  @IsOptional()
  @IsMongoId()
  modelId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ncm?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  cst?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  ean?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  buyPrice?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  sellPrice?: number;

  @IsOptional()
  @IsBoolean()
  hasSeals?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  amountStart?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  amountSold?: number;

  @IsOptional()
  @IsBoolean()
  amountUnlimited?: boolean;
}
