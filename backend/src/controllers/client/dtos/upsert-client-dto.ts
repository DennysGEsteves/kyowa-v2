import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { InterestProduct, Origin } from 'src/entities/client/types';
import { IsValidEnum } from 'src/util/is-valid-enum/is-valid-enum';

export class UpsertClientDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly nameFilter?: string;

  @IsOptional()
  @IsString()
  readonly cpf?: string;

  @IsOptional()
  @IsString()
  readonly rg?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  readonly nasc?: Date;

  @IsOptional()
  @IsString()
  readonly occupation?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

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
  @IsArray()
  @IsValidEnum(InterestProduct)
  readonly interestProducts?: InterestProduct[];

  @IsOptional()
  @IsArray()
  @IsValidEnum(Origin)
  readonly origins?: Origin[];

  @IsOptional()
  @IsString()
  readonly architectID?: string;
}
