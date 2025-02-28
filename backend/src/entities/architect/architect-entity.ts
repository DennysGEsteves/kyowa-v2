import { ClientEntity } from '../client';
import { UserEntity } from '../user';

type IConstructorParams = {
  readonly id?: number;
  readonly name: string;
  readonly nameFilter?: string;
  readonly cpf?: string;
  readonly nasc?: Date;
  readonly email?: string;
  readonly address?: string;
  readonly phone?: string;
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
  public readonly address?: string;
  public readonly phone?: string;
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
    this.address = params.address;
    this.phone = params.phone;
    this.obs = params.obs;
    this.active = params.active;
    this.sellerId = params.sellerId;

    this.seller = params.seller;
    this.clients = params.clients;
  }
}
