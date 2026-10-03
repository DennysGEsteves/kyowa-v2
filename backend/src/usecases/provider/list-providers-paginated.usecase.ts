import { Inject, Injectable } from '@nestjs/common';
import { ListPaginatedNameActiveQueryDto } from '../../dto/list-paginated-name-active-query.dto';
import { ProviderEntity } from '../../entities/provider';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';
import { PaginatedResult } from '../../types/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ListProvidersPaginatedUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(
    query: ListPaginatedNameActiveQueryDto,
  ): Promise<PaginatedResult<ProviderEntity>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;
    const name = query.name?.trim();

    return this.providerRepository.findPaginated(
      {
        name: name || undefined,
        active: query.active,
      },
      { page, limit },
    );
  }
}
