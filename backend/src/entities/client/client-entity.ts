import { ArchitectEntity } from '../architect';
import { InterestProduct, Origin } from './types';

type IConstructorParams = {
  readonly id?: number;
  readonly name: string;
  readonly nameFilter?: string;
  readonly cpf?: string;
  readonly rg?: string;
  readonly birthday?: Date;
  readonly occupation?: string;
  readonly email?: string;
  readonly address?: string;
  readonly phone?: string;
  readonly obs?: string;
  readonly active?: boolean;
  readonly interestProducts?: InterestProduct[];
  readonly origins?: Origin[];
  readonly createdAt?: Date;
  readonly architectID?: string;

  readonly architect?: ArchitectEntity;
};

export class ClientEntity {
  public readonly id?: number;
  public readonly name: string;
  public readonly nameFilter?: string;
  public readonly cpf?: string;
  public readonly rg?: string;
  public readonly birthday?: Date;
  public readonly occupation?: string;
  public readonly email?: string;
  public readonly address?: string;
  public readonly phone?: string;
  public readonly obs?: string;
  public readonly active?: boolean;
  public readonly interestProducts?: InterestProduct[];
  public readonly origins?: Origin[];
  public readonly createdAt?: Date;
  public readonly architectID?: string;

  public readonly architect?: ArchitectEntity;

  constructor(params: IConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cpf = params.cpf;
    this.rg = params.rg;
    this.architectID = params.architectID;
    this.birthday = params.birthday;
    this.occupation = params.occupation;
    this.email = params.email;
    this.address = params.address;
    this.phone = params.phone;
    this.obs = params.obs;
    this.active = params.active;
    this.interestProducts = params.interestProducts;
    this.origins = params.origins;
    this.createdAt = params.createdAt;

    this.architect = params.architect;
  }
}
