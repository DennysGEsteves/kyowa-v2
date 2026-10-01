import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ProviderType } from '../../../entities/provider/types/provider-type';

export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  nameFilter?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  cnpj?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  im?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  ie?: string;

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
  @IsEnum(ProviderType)
  type?: ProviderType;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
