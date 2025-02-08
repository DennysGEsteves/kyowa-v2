import { SupplierType } from './types';

type IConstructorParams = {
  readonly id?: number;
  readonly name?: string;
  readonly nameFilter?: string;
  readonly cpnj?: string;
  readonly im?: string;
  readonly ie?: string;
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
  readonly type?: SupplierType;
};

export class SupplierEntity {
  public readonly id?: number;
  public readonly name?: string;
  public readonly nameFilter?: string;
  public readonly cpnj?: string;
  public readonly im?: string;
  public readonly ie?: string;
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
  public readonly type?: SupplierType;

  constructor(params: IConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cpnj = params.cpnj;
    this.im = params.im;
    this.ie = params.ie;
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
  }
}
