import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class SearchSealsQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly number!: number;
}
