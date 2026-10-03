import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductColorDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly name?: string;
}
