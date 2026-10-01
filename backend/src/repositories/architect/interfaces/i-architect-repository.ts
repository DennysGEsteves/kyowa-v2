import { ArchitectEntity } from '../../../entities/architect';

export const ARCHITECT_REPOSITORY = Symbol('ARCHITECT_REPOSITORY');

export interface CreateArchitectData {
  name: string;
  nameFilter?: string;
  cpf?: string | null;
  nasc?: Date | null;
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
  sellerId: string;
}

export interface UpdateArchitectData {
  name?: string;
  nameFilter?: string;
  cpf?: string | null;
  nasc?: Date | null;
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
  sellerId?: string;
}

export interface IArchitectRepository {
  create(data: CreateArchitectData): Promise<ArchitectEntity>;
  findAll(): Promise<ArchitectEntity[]>;
  findById(id: string): Promise<ArchitectEntity | null>;
  update(id: string, data: UpdateArchitectData): Promise<ArchitectEntity | null>;
  delete(id: string): Promise<boolean>;
}
