import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ListPaginatedNameActiveQueryDto } from '../../../dto/list-paginated-name-active-query.dto';

export class ListClientsPaginatedQueryDto extends ListPaginatedNameActiveQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(20)
  cpf?: string;
}
