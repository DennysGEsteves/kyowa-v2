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
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  pass?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  login?: string;

  @IsEnum(UserPermission)
  permission: UserPermission;

  @IsMongoId()
  storeId: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
