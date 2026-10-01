import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
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
  @IsInt()
  @Min(1)
  storeId?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
