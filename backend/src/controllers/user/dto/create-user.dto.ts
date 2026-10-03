import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserPermission } from '../../../entities/user/types/user-permission';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  readonly login: string;

  @IsNotEmpty()
  @IsEnum(UserPermission)
  readonly permission: UserPermission;

  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean;

  @IsOptional()
  @IsMongoId()
  readonly storeId?: string;
}
