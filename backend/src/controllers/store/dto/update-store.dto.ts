import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { StoreAddressDto } from './store-address.dto';

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  readonly email?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => StoreAddressDto)
  readonly address?: StoreAddressDto;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  readonly phone1?: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  readonly phone2?: string;

  @IsOptional()
  @IsString()
  readonly obs?: string;

  @IsOptional()
  @IsMongoId()
  readonly managerId?: string | null;
}
