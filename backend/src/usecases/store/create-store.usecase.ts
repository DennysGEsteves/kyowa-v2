import { Inject, Injectable } from '@nestjs/common';
import { StoreEntity } from '../../entities/store';
import {
  CreateStoreData,
  IStoreRepository,
  STORE_REPOSITORY,
} from '../../repositories/store/interfaces/i-store-repository';

@Injectable()
export class CreateStoreUseCase {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  execute(data: CreateStoreData): Promise<StoreEntity> {
    return this.storeRepository.create(data);
  }
}
