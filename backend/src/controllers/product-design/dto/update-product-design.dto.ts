import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductDesignDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
