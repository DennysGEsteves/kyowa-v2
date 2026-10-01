import { ClientEntity } from '../../../entities/client';
import { ClientOrigin, InterestProduct } from '../../../entities/client/types';

export const CLIENT_REPOSITORY = Symbol('CLIENT_REPOSITORY');

export interface CreateClientData {
  name: string;
  nameFilter?: string;
  cpf?: string | null;
  rg?: string | null;
  architectId?: string | null;
  nasc?: Date | null;
  occupation?: string | null;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  active?: boolean;
  interestProducts?: InterestProduct[] | null;
  origins?: ClientOrigin[] | null;
  entry?: Date;
}

export interface UpdateClientData {
  name?: string;
  nameFilter?: string;
  cpf?: string | null;
  rg?: string | null;
  architectId?: string | null;
  nasc?: Date | null;
  occupation?: string | null;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  active?: boolean;
  interestProducts?: InterestProduct[] | null;
  origins?: ClientOrigin[] | null;
  entry?: Date;
}

export interface IClientRepository {
  create(data: CreateClientData): Promise<ClientEntity>;
  findAll(): Promise<ClientEntity[]>;
  findById(id: string): Promise<ClientEntity | null>;
  update(id: string, data: UpdateClientData): Promise<ClientEntity | null>;
  delete(id: string): Promise<boolean>;
}
