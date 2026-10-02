import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserPermission } from '../../../entities/user/types/user-permission';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

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

  @IsOptional()
  @IsEnum(UserPermission)
  permission?: UserPermission;

  @IsOptional()
  @IsMongoId()
  storeId?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
