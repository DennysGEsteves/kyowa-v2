import { Inject, Injectable } from '@nestjs/common';
import { SearchProvidersByNameQueryDto } from '../../controllers/provider/dto/search-providers-by-name-query.dto';
import { ProviderEntity } from '../../entities/provider';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';

const DEFAULT_LIMIT = 10;

@Injectable()
export class SearchProvidersByNameUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(
    query: SearchProvidersByNameQueryDto,
  ): Promise<ProviderEntity[]> {
    const name = query.name.trim();
    const limit = query.limit ?? DEFAULT_LIMIT;
    return this.providerRepository.searchByName(name, limit);
  }
}
