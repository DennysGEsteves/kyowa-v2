import { ProviderType } from './types/provider-type';

export class ProviderEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public nameFilter: string,
    public cnpj: string | null,
    public im: string | null,
    public ie: string | null,
    public email: string | null,
    public cep: string | null,
    public address: string | null,
    public district: string | null,
    public city: string | null,
    public region: string | null,
    public phone1: string | null,
    public phone2: string | null,
    public obs: string | null,
    public type: ProviderType | null,
    public active: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
