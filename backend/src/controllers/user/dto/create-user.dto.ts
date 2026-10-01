import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
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

  @IsInt()
  @Min(1)
  storeId: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
