import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductModelDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;
}
