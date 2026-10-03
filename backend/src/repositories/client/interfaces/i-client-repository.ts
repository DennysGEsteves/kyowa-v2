import { ClientEntity } from '../../../entities/client';

export const CLIENT_REPOSITORY = Symbol('CLIENT_REPOSITORY');

export interface IClientRepository {
  create(data: ClientEntity): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findById(id: string): Promise<ClientEntity | null>;
  update(id: string, data: ClientEntity): Promise<ClientEntity | null>;
  delete(id: string): Promise<boolean>;
}
