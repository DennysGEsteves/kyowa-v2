import { Injectable } from '@nestjs/common';
import { StoreMapper } from 'src/adapters/mappers/store';
import { StoreEntity } from 'src/entities';
import { IStoreRepository } from 'src/repositories/store/interfaces';

@Injectable()
export class GetStoresUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  public async execute(): Promise<StoreEntity[]> {
    const storesDB = await this.storeRepository.findAll();
    return StoreMapper.fromDBList(storesDB);
  }
}
