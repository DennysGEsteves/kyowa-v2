import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpsertArchitectDTO {
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
  readonly cpf?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly nasc?: Date;

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
  readonly sellerId?: string;
}
