import { Inject, Injectable } from '@nestjs/common';
import { ListPaginatedNameActiveQueryDto } from '../../dto/list-paginated-name-active-query.dto';
import { ArchitectEntity } from '../../entities/architect';
import {
  ARCHITECT_REPOSITORY,
  IArchitectRepository,
} from '../../repositories/architect/interfaces/i-architect-repository';
import { PaginatedResult } from '../../types/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ListArchitectsPaginatedUseCase {
  constructor(
    @Inject(ARCHITECT_REPOSITORY)
    private readonly architectRepository: IArchitectRepository,
  ) {}

  async execute(
    query: ListPaginatedNameActiveQueryDto,
  ): Promise<PaginatedResult<ArchitectEntity>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;
    const name = query.name?.trim();

    return this.architectRepository.findPaginated(
      {
        name: name || undefined,
        active: query.active,
      },
      { page, limit },
    );
  }
}
