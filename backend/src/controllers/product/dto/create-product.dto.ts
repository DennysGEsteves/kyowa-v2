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
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly fantasyName: string;

  @IsOptional()
  @IsMongoId()
  readonly categoryId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly ref?: string;

  @IsOptional()
  @IsMongoId()
  readonly unitId?: string;

  @IsOptional()
  @IsMongoId()
  readonly colorId?: string;

  @IsOptional()
  @IsMongoId()
  readonly sizeId?: string;

  @IsOptional()
  @IsMongoId()
  readonly designId?: string;

  @IsOptional()
  @IsMongoId()
  readonly shapeId?: string;

  @IsOptional()
  @IsMongoId()
  readonly originId?: string;

  @IsOptional()
  @IsMongoId()
  readonly modelId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly ncm?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly cst?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly ean?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly buyPrice?: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly sellPrice?: number;

  @IsOptional()
  @IsBoolean()
  readonly hasSeals?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  readonly amountStart?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  readonly amountSold?: number;

  @IsOptional()
  @IsBoolean()
  readonly amountUnlimited?: boolean;

  @IsOptional()
  @IsBoolean()
  @MaxLength(100)
  readonly isEcommerce?: boolean;
}
