import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  ClientOrigin,
  InterestProduct,
} from '../../../entities/client/types';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nameFilter?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  cpf?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  rg?: string;

  @IsOptional()
  @IsMongoId()
  architectId?: string;

  @IsOptional()
  @IsDateString()
  nasc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  occupation?: string;

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
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(InterestProduct, { each: true })
  interestProducts?: InterestProduct[];

  @IsOptional()
  @IsArray()
  @IsEnum(ClientOrigin, { each: true })
  origins?: ClientOrigin[];

  @IsOptional()
  @IsDateString()
  entry?: string;
}
