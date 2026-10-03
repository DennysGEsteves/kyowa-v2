import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductHeightDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;
}
