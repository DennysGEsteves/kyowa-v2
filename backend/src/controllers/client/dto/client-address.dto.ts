import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ClientAddressDto {
  @IsOptional()
  @IsString()
  @MaxLength(10)
  readonly cep?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly street?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly number?: string;

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
}
