import {
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  district?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  region?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  phone2?: string;

  @IsOptional()
  @IsString()
  obs?: string;

  @IsOptional()
  @IsMongoId()
  managerId?: string | null;
}
