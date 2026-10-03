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
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly pass?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly login?: string;

  @IsOptional()
  @IsEnum(UserPermission)
  readonly permission?: UserPermission;

  @IsOptional()
  @IsMongoId()
  readonly storeId?: string;

  @IsOptional()
  @IsBoolean()
  readonly active?: boolean;
}
