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
import { ClientOrigin, InterestProduct } from '../../../entities/client/types';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly nameFilter?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly cpf?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly rg?: string;

  @IsOptional()
  @IsMongoId()
  readonly architectId?: string;

  @IsOptional()
  @IsDateString()
  readonly nasc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly occupation?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  readonly cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly district?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  readonly region?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  readonly phone1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  readonly phone2?: string;

  @IsOptional()
  @IsString()
  readonly obs?: string;

  @IsOptional()
  @IsBoolean()
  readonly active?: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(InterestProduct, { each: true })
  readonly interestProducts?: InterestProduct[];

  @IsOptional()
  @IsArray()
  @IsEnum(ClientOrigin, { each: true })
  readonly origins?: ClientOrigin[];

  @IsOptional()
  @IsDateString()
  readonly entry?: string;
}
