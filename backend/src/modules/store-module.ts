import { Module } from '@nestjs/common';
import { StoreController } from 'src/controllers/store/store-controller';
import { IStoreRepository } from 'src/repositories/store/interfaces';
import { StoreRepository } from 'src/repositories/store/store-repository';
import {
  CreateStoreUseCase,
  GetStoresUseCase,
  UpdateStoreUseCase,
} from 'src/usecases/store';

@Module({
  imports: [],
  controllers: [StoreController],
  providers: [
    GetStoresUseCase,
    CreateStoreUseCase,
    UpdateStoreUseCase,
    { provide: IStoreRepository, useClass: StoreRepository },
  ],
  exports: [],
})
export class StoreModule {}
