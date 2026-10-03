import { CreateProviderDto } from '../../controllers/provider/dto/create-provider.dto';
import { UpdateProviderDto } from '../../controllers/provider/dto/update-provider.dto';
import { ProviderDocument } from '../../repositories/provider/schemas/provider.schema';
import { resolveNameFilter } from '../../util/string/name-filter';
import { ProviderType } from './types/provider-type';

export interface IProviderConstructorParams {
  id?: string;
  name: string;
  nameFilter: string;
  cnpj?: string | null;
  im?: string | null;
  ie?: string | null;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  type?: ProviderType | null;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProviderEntity {
  public id?: string;
  public name: string;
  public nameFilter: string;
  public cnpj: string | null;
  public im: string | null;
  public ie: string | null;
  public email: string | null;
  public cep: string | null;
  public address: string | null;
  public district: string | null;
  public city: string | null;
  public region: string | null;
  public phone1: string | null;
  public phone2: string | null;
  public obs: string | null;
  public type: ProviderType | null;
  public active: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(params: IProviderConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cnpj = params.cnpj ?? null;
    this.im = params.im ?? null;
    this.ie = params.ie ?? null;
    this.email = params.email ?? null;
    this.cep = params.cep ?? null;
    this.address = params.address ?? null;
    this.district = params.district ?? null;
    this.city = params.city ?? null;
    this.region = params.region ?? null;
    this.phone1 = params.phone1 ?? null;
    this.phone2 = params.phone2 ?? null;
    this.obs = params.obs ?? null;
    this.type = params.type ?? null;
    this.active = params.active ?? true;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static fromPersistData(document: ProviderDocument): ProviderEntity {
    return new ProviderEntity({
      id: document._id.toString(),
      name: document.name,
      nameFilter: document.nameFilter,
      cnpj: document.cnpj,
      im: document.im,
      ie: document.ie,
      email: document.email,
      cep: document.cep,
      address: document.address,
      district: document.district,
      city: document.city,
      region: document.region,
      phone1: document.phone1,
      phone2: document.phone2,
      obs: document.obs,
      type: document.type,
      active: document.active,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static fromCreateProviderDto(dto: CreateProviderDto): ProviderEntity {
    return new ProviderEntity({
      name: dto.name,
      nameFilter: resolveNameFilter(dto.name, dto.nameFilter),
      cnpj: dto.cnpj,
      im: dto.im,
      ie: dto.ie,
      email: dto.email,
      cep: dto.cep,
      address: dto.address,
      district: dto.district,
      city: dto.city,
      region: dto.region,
      phone1: dto.phone1,
      phone2: dto.phone2,
      obs: dto.obs,
      type: dto.type,
      active: dto.active,
    });
  }

  static fromUpdateProviderDto(
    oldProvider: ProviderEntity,
    dto: UpdateProviderDto,
  ): ProviderEntity {
    const name = dto.name ?? oldProvider.name;

    return new ProviderEntity({
      id: oldProvider.id,
      name,
      nameFilter:
        dto.nameFilter ??
        (dto.name !== undefined
          ? resolveNameFilter(name)
          : oldProvider.nameFilter),
      cnpj: dto.cnpj !== undefined ? dto.cnpj : oldProvider.cnpj,
      im: dto.im !== undefined ? dto.im : oldProvider.im,
      ie: dto.ie !== undefined ? dto.ie : oldProvider.ie,
      email: dto.email !== undefined ? dto.email : oldProvider.email,
      cep: dto.cep !== undefined ? dto.cep : oldProvider.cep,
      address: dto.address !== undefined ? dto.address : oldProvider.address,
      district:
        dto.district !== undefined ? dto.district : oldProvider.district,
      city: dto.city !== undefined ? dto.city : oldProvider.city,
      region: dto.region !== undefined ? dto.region : oldProvider.region,
      phone1: dto.phone1 !== undefined ? dto.phone1 : oldProvider.phone1,
      phone2: dto.phone2 !== undefined ? dto.phone2 : oldProvider.phone2,
      obs: dto.obs !== undefined ? dto.obs : oldProvider.obs,
      type: dto.type !== undefined ? dto.type : oldProvider.type,
      active: dto.active !== undefined ? dto.active : oldProvider.active,
      createdAt: oldProvider.createdAt,
      updatedAt: oldProvider.updatedAt,
    });
  }
}
