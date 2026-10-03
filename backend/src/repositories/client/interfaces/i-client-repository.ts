import { ClientEntity } from '../../../entities/client';
import { PaginatedResult } from '../../../types/pagination';

export const CLIENT_REPOSITORY = Symbol('CLIENT_REPOSITORY');

export interface ClientListFilters {
  name?: string;
  cpf?: string;
  active?: boolean;
}

export interface ClientPaginationParams {
  page: number;
  limit: number;
}

export interface IClientRepository {
  create(data: ClientEntity): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findPaginated(
    filters: ClientListFilters,
    pagination: ClientPaginationParams,
  ): Promise<PaginatedResult<ClientEntity>>;
  findById(id: string): Promise<ClientEntity | null>;
  update(id: string, data: ClientEntity): Promise<ClientEntity | null>;
  delete(id: string): Promise<boolean>;
}
