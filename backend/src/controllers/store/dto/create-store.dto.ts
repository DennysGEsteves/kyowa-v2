import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly name: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(50)
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  readonly cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly district?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2)
  readonly region?: string;

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
  readonly managerId?: string;
}
