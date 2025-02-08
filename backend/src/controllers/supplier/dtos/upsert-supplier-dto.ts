import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SupplierType } from 'src/entities/supplier/types';
import { IsValidEnum } from 'src/util/is-valid-enum/is-valid-enum';

export class UpsertSupplierDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly nameFilter?: string;

  @IsOptional()
  @IsString()
  readonly cnpj?: string;

  @IsOptional()
  @IsString()
  readonly im?: string;

  @IsOptional()
  @IsString()
  readonly ie?: string;

  @IsOptional()
  @IsString()
  readonly cep?: string;

  @IsOptional()
  @IsString()
  readonly address?: string;

  @IsOptional()
  @IsString()
  readonly district?: string;

  @IsOptional()
  @IsString()
  readonly city?: string;

  @IsOptional()
  @IsString()
  readonly region?: string;

  @IsOptional()
  @IsString()
  readonly phone1?: string;

  @IsOptional()
  @IsString()
  readonly phone2?: string;

  @IsOptional()
  @IsString()
  readonly obs?: string;

  @IsOptional()
  @IsBoolean()
  readonly active?: boolean;

  @IsOptional()
  @IsString()
  @IsValidEnum(SupplierType)
  readonly type?: SupplierType;
}
