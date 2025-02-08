import { UserEntity } from '../user';

type IConstructorParams = {
  readonly id?: number;
  readonly name: string;
  readonly email?: string;
  readonly cep?: string;
  readonly address?: string;
  readonly district?: string;
  readonly city?: string;
  readonly region?: string;
  readonly phone1?: string;
  readonly phone2?: string;
  readonly obs?: string;
  readonly managerId?: string;

  readonly manager?: UserEntity;
};

export class StoreEntity {
  public readonly id?: number;
  public readonly name: string;
  public readonly email?: string;
  public readonly cep?: string;
  public readonly address?: string;
  public readonly district?: string;
  public readonly city?: string;
  public readonly region?: string;
  public readonly phone1?: string;
  public readonly phone2?: string;
  public readonly obs?: string;
  public readonly managerId?: string;

  public readonly manager?: UserEntity;

  constructor(params: IConstructorParams) {
    this.id = params.id;
    this.address = params.address;
    this.name = params.name;
    this.email = params.email;
    this.cep = params.cep;
    this.district = params.district;
    this.city = params.city;
    this.region = params.region;
    this.phone1 = params.phone1;
    this.phone2 = params.phone2;
    this.obs = params.obs;
    this.managerId = params.managerId;

    this.manager = params.manager;
  }
}
