import { StoreEntity } from 'src/entities';
import { GetStoresDTOPresenter } from './dtos/get-stores.dto';

export class StorePresenter {
  static toGetStoresDTO(stores: StoreEntity[]): GetStoresDTOPresenter[] {
    return stores.map((store) => ({
      mid: store.mid,
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      phone: store.phone,
      obs: store.obs,
      managerId: store.managerId,
      manager: store.manager,
    }));
  }
}
