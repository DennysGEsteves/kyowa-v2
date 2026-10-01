import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductColorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
