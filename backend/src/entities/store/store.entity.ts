import { CreateStoreDto } from '../../controllers/store/dto/create-store.dto';
import { UpdateStoreDto } from '../../controllers/store/dto/update-store.dto';
import { StoreDocument } from '../../repositories/store/schemas/store.schema';

export interface IStoreConstructorParams {
  id?: string;
  name: string;
  email?: string | null;
  cep?: string | null;
  address?: string | null;
  district?: string | null;
  city?: string | null;
  region?: string | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  managerId?: string | null;
}

export class StoreEntity {
  public id?: string;
  public name: string;
  public email: string | null;
  public cep: string | null;
  public address: string | null;
  public district: string | null;
  public city: string | null;
  public region: string | null;
  public phone1: string | null;
  public phone2: string | null;
  public obs: string | null;
  public managerId: string | null;

  constructor(params: IStoreConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email ?? null;
    this.cep = params.cep ?? null;
    this.address = params.address ?? null;
    this.district = params.district ?? null;
    this.city = params.city ?? null;
    this.region = params.region ?? null;
    this.phone1 = params.phone1 ?? null;
    this.phone2 = params.phone2 ?? null;
    this.obs = params.obs ?? null;
    this.managerId = params.managerId ?? null;
  }

  static fromPersistData(document: StoreDocument): StoreEntity {
    return new StoreEntity({
      id: document._id.toString(),
      name: document.name,
      email: document.email,
      cep: document.cep,
      address: document.address,
      district: document.district,
      city: document.city,
      region: document.region,
      phone1: document.phone1,
      phone2: document.phone2,
      obs: document.obs,
      managerId: document.managerId?.toString() ?? null,
    });
  }

  static fromCreateStoreDto(dto: CreateStoreDto): StoreEntity {
    return new StoreEntity({
      name: dto.name,
      email: dto.email,
      cep: dto.cep,
      address: dto.address,
      district: dto.district,
      city: dto.city,
      region: dto.region,
      phone1: dto.phone1,
      phone2: dto.phone2,
      obs: dto.obs,
      managerId: dto.managerId,
    });
  }

  static fromUpdateStoreDto(
    oldStore: StoreEntity,
    dto: UpdateStoreDto,
  ): StoreEntity {
    return new StoreEntity({
      id: oldStore.id,
      name: dto.name ?? oldStore.name,
      email: dto.email !== undefined ? dto.email : oldStore.email,
      cep: dto.cep !== undefined ? dto.cep : oldStore.cep,
      address: dto.address !== undefined ? dto.address : oldStore.address,
      district: dto.district !== undefined ? dto.district : oldStore.district,
      city: dto.city !== undefined ? dto.city : oldStore.city,
      region: dto.region !== undefined ? dto.region : oldStore.region,
      phone1: dto.phone1 !== undefined ? dto.phone1 : oldStore.phone1,
      phone2: dto.phone2 !== undefined ? dto.phone2 : oldStore.phone2,
      obs: dto.obs !== undefined ? dto.obs : oldStore.obs,
      managerId:
        dto.managerId !== undefined ? dto.managerId : oldStore.managerId,
    });
  }
}
