import { ProviderEntity } from '../../../entities/provider';
import { PaginatedResult } from '../../../types/pagination';

export const PROVIDER_REPOSITORY = Symbol('PROVIDER_REPOSITORY');

export interface ProviderListFilters {
  name?: string;
  active?: boolean;
}

export interface ProviderPaginationParams {
  page: number;
  limit: number;
}

export interface IProviderRepository {
  create(data: ProviderEntity): Promise<ProviderEntity>;
  findAll(): Promise<ProviderEntity[]>;
  findPaginated(
    filters: ProviderListFilters,
    pagination: ProviderPaginationParams,
  ): Promise<PaginatedResult<ProviderEntity>>;
  findById(id: string): Promise<ProviderEntity | null>;
  update(id: string, data: ProviderEntity): Promise<ProviderEntity | null>;
  delete(id: string): Promise<boolean>;
}
