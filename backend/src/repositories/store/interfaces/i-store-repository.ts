import { StoreEntity } from 'src/entities/store/store-entity';
import { StoreDB } from '../type';

export abstract class IStoreRepository {
  public abstract findAll(): Promise<StoreDB[]>;
  public abstract findById(id: number): Promise<StoreDB>;
  public abstract create(store: StoreEntity): Promise<StoreDB>;
  public abstract update(store: StoreEntity): Promise<StoreDB>;
}
