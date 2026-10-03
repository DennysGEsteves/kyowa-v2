import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductDesignDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly name: string;
}
