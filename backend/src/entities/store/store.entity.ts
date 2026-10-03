import { CreateStoreDto } from '../../controllers/store/dto/create-store.dto';
import { UpdateStoreDto } from '../../controllers/store/dto/update-store.dto';
import { Address, toAddress } from '../../types/address';
import { StoreDocument } from '../../repositories/store/schemas/store.schema';

export interface IStoreConstructorParams {
  id?: string;
  name: string;
  email?: string | null;
  address?: Address | null;
  phone1?: string | null;
  phone2?: string | null;
  obs?: string | null;
  managerId?: string | null;
}

export class StoreEntity {
  public id?: string;
  public name: string;
  public email: string | null;
  public address: Address | null;
  public phone1: string | null;
  public phone2: string | null;
  public obs: string | null;
  public managerId: string | null;

  constructor(params: IStoreConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.email = params.email ?? null;
    this.address = params.address ?? null;
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
      address: document.address ?? null,
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
      address: toAddress(dto.address),
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
      address:
        dto.address !== undefined ? toAddress(dto.address) : oldStore.address,
      phone1: dto.phone1 !== undefined ? dto.phone1 : oldStore.phone1,
      phone2: dto.phone2 !== undefined ? dto.phone2 : oldStore.phone2,
      obs: dto.obs !== undefined ? dto.obs : oldStore.obs,
      managerId:
        dto.managerId !== undefined ? dto.managerId : oldStore.managerId,
    });
  }
}
