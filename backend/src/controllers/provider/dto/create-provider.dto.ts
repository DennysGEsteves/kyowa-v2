import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ProviderAddressDto } from './provider-address.dto';
import { ProviderType } from '../../../entities/provider/types/provider-type';

export class CreateProviderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;

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

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProviderAddressDto)
  readonly address?: ProviderAddressDto;

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
