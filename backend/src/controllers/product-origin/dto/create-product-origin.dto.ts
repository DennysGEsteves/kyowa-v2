import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductOriginDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
