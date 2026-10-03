import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ProviderType } from '../../../entities/provider/types/provider-type';

export class UpdateProviderDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly nameFilter?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly cnpj?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly im?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly ie?: string;

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
  @IsEnum(ProviderType)
  readonly type?: ProviderType;

  @IsOptional()
  @IsBoolean()
  readonly active?: boolean;
}
