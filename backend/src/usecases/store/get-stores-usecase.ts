import { Injectable } from '@nestjs/common';
import { StoreMapper } from 'src/adapters/mappers/store';
import { StorePresenter } from 'src/adapters/presenters/store';
import { GetStoresDTOPresenter } from 'src/adapters/presenters/store/dtos/get-stores.dto';
import { IStoreRepository } from 'src/repositories/store/interfaces';

@Injectable()
export class GetStoresUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  public async execute(): Promise<GetStoresDTOPresenter[]> {
    const storesDB = await this.storeRepository.findAll();
    const stores = StoreMapper.fromDBList(storesDB);
    return StorePresenter.toGetStoresDTO(stores);
  }
}
