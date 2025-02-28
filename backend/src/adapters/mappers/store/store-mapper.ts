import { UpsertStoreDTO } from 'src/controllers/store/dto';
import { StoreEntity } from 'src/entities/store/store-entity';
import { StoreDB } from 'src/repositories/store/type';
import { UserMapper } from '../user';
import { UserDB } from 'src/repositories/user/types';

export class StoreMapper {
  public static fromUpsertStoreDTO(dto: UpsertStoreDTO): StoreEntity {
    return new StoreEntity({
      ...(dto.id ? { id: dto.id } : {}),
      name: dto.name,
      email: dto.email,
      address: dto.address,
      phone: dto.phone,
      obs: dto.obs,
      managerId: dto.managerId,
    });
  }

  public static fromDB(store: StoreDB): StoreEntity {
    return new StoreEntity({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      phone: store.phone,
      obs: store.obs,
      managerId: store.managerId,

      manager: store.manager ? UserMapper.fromStoreDB(store) : null,
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
        address: store.address,
        phone: store.phone,
        obs: store.obs,
        managerId: store.managerId,

        manager: UserMapper.fromStoreDB(store),
      });
    });
  }
}
