import { Inject, Injectable } from '@nestjs/common';
import { StoreEntity } from '../../entities/store';
import {
  IStoreRepository,
  STORE_REPOSITORY,
} from '../../repositories/store/interfaces/i-store-repository';

@Injectable()
export class GetStoresUseCase {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  execute(): Promise<StoreEntity[]> {
    return this.storeRepository.findAll();
  }
}
