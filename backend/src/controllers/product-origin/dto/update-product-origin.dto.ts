import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductOriginDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly name?: string;
}
