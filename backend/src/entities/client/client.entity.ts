import { ClientOrigin, InterestProduct } from './types';

export class ClientEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public nameFilter: string,
    public cpf: string | null,
    public rg: string | null,
    public architectId: string | null,
    public nasc: Date | null,
    public occupation: string | null,
    public email: string | null,
    public cep: string | null,
    public address: string | null,
    public district: string | null,
    public city: string | null,
    public region: string | null,
    public phone1: string | null,
    public phone2: string | null,
    public obs: string | null,
    public active: boolean,
    public interestProducts: InterestProduct[] | null,
    public origins: ClientOrigin[] | null,
    public entry: Date,
  ) {}
}
