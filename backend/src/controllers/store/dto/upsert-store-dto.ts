import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertStoreDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsEmail()
  readonly cep: string;

  @IsOptional()
  @IsEmail()
  readonly address: string;

  @IsOptional()
  @IsEmail()
  readonly district: string;

  @IsOptional()
  @IsEmail()
  readonly city: string;

  @IsOptional()
  @IsEmail()
  readonly region: string;

  @IsOptional()
  @IsEmail()
  readonly phone1: string;

  @IsOptional()
  @IsEmail()
  readonly phone2: string;

  @IsOptional()
  @IsEmail()
  readonly obs: string;

  @IsOptional()
  @IsEmail()
  readonly managerId: string;
}
