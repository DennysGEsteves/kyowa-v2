import { ArchitectEntity } from '../../../entities/architect';
import { PaginatedResult } from '../../../types/pagination';

export const ARCHITECT_REPOSITORY = Symbol('ARCHITECT_REPOSITORY');

export interface ArchitectListFilters {
  name?: string;
  active?: boolean;
}

export interface ArchitectPaginationParams {
  page: number;
  limit: number;
}

export interface IArchitectRepository {
  create(data: ArchitectEntity): Promise<ArchitectEntity>;
  findAll(): Promise<ArchitectEntity[]>;
  findPaginated(
    filters: ArchitectListFilters,
    pagination: ArchitectPaginationParams,
  ): Promise<PaginatedResult<ArchitectEntity>>;
  findById(id: string): Promise<ArchitectEntity | null>;
  update(id: string, data: ArchitectEntity): Promise<ArchitectEntity | null>;
  delete(id: string): Promise<boolean>;
}
