import { StoreEntity } from '../../../entities/store';

export const STORE_REPOSITORY = Symbol('STORE_REPOSITORY');

export interface IStoreRepository {
  create(data: StoreEntity): Promise<StoreEntity>;
  findAll(): Promise<StoreEntity[]>;
  findById(id: string): Promise<StoreEntity | null>;
  update(id: string, data: StoreEntity): Promise<StoreEntity | null>;
  delete(id: string): Promise<boolean>;
}
