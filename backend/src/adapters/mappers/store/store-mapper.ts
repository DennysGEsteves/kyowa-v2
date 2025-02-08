import { UpsertStoreDTO } from 'src/controllers/store/dto/upsert-store-dto';
import { StoreEntity } from 'src/entities/store/store-entity';
import { StoreDB } from 'src/repositories/store/type';
import { UserMapper } from '../user';
import { UserDB } from 'src/repositories/user/types';

export class StoreMapper {
  public static fromUpsertStoreDTO(
    dto: UpsertStoreDTO,
    storeId?: number,
  ): StoreEntity {
    return new StoreEntity({
      ...(storeId ? { id: storeId } : {}),
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

  public static fromDB(store: StoreDB): StoreEntity {
    return new StoreEntity({
      id: store.id,
      name: store.name,
      email: store.email,
      cep: store.cep,
      address: store.address,
      district: store.district,
      city: store.city,
      region: store.region,
      phone1: store.phone1,
      phone2: store.phone2,
      obs: store.obs,
      managerId: store.managerId,

      manager: UserMapper.fromStoreDB(store),
    });
  }

  public static fromDBList(stores: StoreDB[]): StoreEntity[] {
    return stores.map((store) => StoreMapper.fromDB(store));
  }

  public static fromUserDB({ managerStores }: UserDB): StoreEntity[] {
    return managerStores.map((store) => {
      return new StoreEntity({
        id: store.id,
        name: store.name,
        email: store.email,
        cep: store.cep,
        address: store.address,
        district: store.district,
        city: store.city,
        region: store.region,
        phone1: store.phone1,
        phone2: store.phone2,
        obs: store.obs,
        managerId: store.managerId,

        manager: UserMapper.fromStoreDB(store),
      });
    });
  }
}
