import { Module } from '@nestjs/common';
import { StoreResolver } from './store.resolver';
import {
  CreateStoreUseCase,
  GetStoresUseCase,
  UpdateStoreUseCase,
  GetStoreByIdUseCase,
} from 'src/usecases/store';
import { IStoreRepository } from 'src/repositories/store/interfaces/i-store-repository';
import { StoreRepository } from 'src/repositories/store/store-repository';

@Module({
  providers: [
    StoreResolver,
    CreateStoreUseCase,
    GetStoresUseCase,
    UpdateStoreUseCase,
    GetStoreByIdUseCase,
    { provide: IStoreRepository, useClass: StoreRepository },
  ],
})
export class StoreModule {}
