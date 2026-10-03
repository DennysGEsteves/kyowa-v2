import { ProviderEntity } from '../../../entities/provider';

export const PROVIDER_REPOSITORY = Symbol('PROVIDER_REPOSITORY');

export interface IProviderRepository {
  create(data: ProviderEntity): Promise<ProviderEntity>;
  findAll(): Promise<ProviderEntity[]>;
  findById(id: string): Promise<ProviderEntity | null>;
  update(id: string, data: ProviderEntity): Promise<ProviderEntity | null>;
  delete(id: string): Promise<boolean>;
}
