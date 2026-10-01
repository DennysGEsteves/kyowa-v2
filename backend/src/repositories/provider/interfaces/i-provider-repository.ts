import { ProviderEntity } from '../../../entities/provider';
import { ProviderType } from '../../../entities/provider/types/provider-type';

export const PROVIDER_REPOSITORY = Symbol('PROVIDER_REPOSITORY');

export interface CreateProviderData {
  name: string;
  nameFilter?: string;
  cnpj?: string | null;
  im?: string | null;
  ie?: string | null;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  type?: ProviderType | null;
  active?: boolean;
}

export interface UpdateProviderData {
  name?: string;
  nameFilter?: string;
  cnpj?: string | null;
  im?: string | null;
  ie?: string | null;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  type?: ProviderType | null;
  active?: boolean;
}

export interface IProviderRepository {
  create(data: CreateProviderData): Promise<ProviderEntity>;
  findAll(): Promise<ProviderEntity[]>;
  findById(id: string): Promise<ProviderEntity | null>;
  update(id: string, data: UpdateProviderData): Promise<ProviderEntity | null>;
  delete(id: string): Promise<boolean>;
}
