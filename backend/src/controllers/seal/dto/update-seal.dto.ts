import { Type } from 'class-transformer';
import { IsInt, IsMongoId, Min } from 'class-validator';

export class UpdateSealDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly number!: number;

  @IsMongoId()
  readonly storeId!: string;

  @IsMongoId()
  readonly productId!: string;
}
