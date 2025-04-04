import { ClientEntity as ClientEntity } from 'src/entities';
import { ClientDB } from '../types';
import { PaginationArgs } from 'src/util/pagination/pagination-args';
import { IClientPagination } from './i-client-pagination';

export abstract class IClientRepository {
  abstract create(client: ClientEntity): Promise<ClientDB>;
  abstract update(client: ClientEntity): Promise<ClientDB>;
  abstract delete(clientId: string): Promise<void>;
  abstract findAll(): Promise<ClientDB[]>;
  abstract findById(id: number): Promise<ClientDB>;
  abstract findAllByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<IClientPagination>;
  abstract findByEmail(email: string): Promise<ClientDB>;
}
