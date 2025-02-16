import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleType } from 'src/entities/user/types';
import { IsValidEnum } from 'src/util/is-valid-enum/is-valid-enum';

export class UpsertUserDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly id?: number;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly phone?: string;

  @IsOptional()
  @IsString()
  readonly login?: string;

  @IsOptional()
  @IsString()
  @IsValidEnum(RoleType)
  readonly role?: RoleType;

  @IsOptional()
  @IsString()
  readonly storeId?: string;
}
