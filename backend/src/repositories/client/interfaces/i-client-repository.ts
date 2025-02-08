import { ClientEntity as ClientEntity } from 'src/entities';
import { ClientDB } from '../types';

export abstract class IClientRepository {
  abstract create(client: ClientEntity): Promise<ClientDB>;
  abstract update(client: ClientEntity): Promise<ClientDB>;
  abstract delete(clientId: string): Promise<void>;
  abstract findAll(): Promise<ClientDB[]>;
  abstract findByEmail(email: string): Promise<ClientDB>;
}
