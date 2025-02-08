import { ClientEntity } from '../client';
import { UserEntity } from '../user';

type IConstructorParams = {
  readonly id?: number;
  readonly name: string;
  readonly nameFilter?: string;
  readonly cpf?: string;
  readonly nasc?: Date;
  readonly email?: string;
  readonly cep?: string;
  readonly address?: string;
  readonly district?: string;
  readonly city?: string;
  readonly region?: string;
  readonly phone1?: string;
  readonly phone2?: string;
  readonly obs?: string;
  readonly active?: boolean;
  readonly sellerId?: string;

  readonly seller?: UserEntity;
  readonly clients?: ClientEntity[];
};

export class ArchitectEntity {
  public readonly id?: number;
  public readonly name: string;
  public readonly nameFilter?: string;
  public readonly cpf?: string;
  public readonly nasc?: Date;
  public readonly email?: string;
  public readonly cep?: string;
  public readonly address?: string;
  public readonly district?: string;
  public readonly city?: string;
  public readonly region?: string;
  public readonly phone1?: string;
  public readonly phone2?: string;
  public readonly obs?: string;
  public readonly active?: boolean;
  public readonly sellerId?: string;

  public readonly seller?: UserEntity;
  public readonly clients?: ClientEntity[];

  constructor(params: IConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cpf = params.cpf;
    this.nasc = params.nasc;
    this.email = params.email;
    this.cep = params.cep;
    this.address = params.address;
    this.district = params.district;
    this.city = params.city;
    this.region = params.region;
    this.phone1 = params.phone1;
    this.phone2 = params.phone2;
    this.obs = params.obs;
    this.active = params.active;
    this.sellerId = params.sellerId;

    this.seller = params.seller;
    this.clients = params.clients;
  }
}
