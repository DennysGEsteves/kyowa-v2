import { StoreEntity } from '../../../entities/store';

export const STORE_REPOSITORY = Symbol('STORE_REPOSITORY');

export interface CreateStoreData {
  name: string;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  managerId?: string | null;
}

export interface UpdateStoreData {
  name?: string;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  managerId?: string | null;
}

export interface IStoreRepository {
  create(data: CreateStoreData): Promise<StoreEntity>;
  findAll(): Promise<StoreEntity[]>;
  findById(id: string): Promise<StoreEntity | null>;
  update(id: string, data: UpdateStoreData): Promise<StoreEntity | null>;
  delete(id: string): Promise<boolean>;
}
