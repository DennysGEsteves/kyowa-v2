import { SupplierType } from './types';

type IConstructorParams = {
  readonly id?: number;
  readonly name?: string;
  readonly nameFilter?: string;
  readonly cpnj?: string;
  readonly im?: string;
  readonly ie?: string;
  readonly email?: string;
  readonly address?: string;
  readonly phone?: string;
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
  public readonly address?: string;
  public readonly phone?: string;
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
    this.address = params.address;
    this.phone = params.phone;
    this.obs = params.obs;
    this.active = params.active;
  }
}
