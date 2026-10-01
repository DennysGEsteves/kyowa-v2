import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { STORE_REPOSITORY } from '../../repositories/store/interfaces/i-store-repository';
import { StoreRepository } from '../../repositories/store/store.repository';
import {
  Store,
  StoreSchema,
} from '../../repositories/store/schemas/store.schema';
import { CreateStoreUseCase } from '../../usecases/store/create-store.usecase';
import { DeleteStoreUseCase } from '../../usecases/store/delete-store.usecase';
import { GetStoreByIdUseCase } from '../../usecases/store/get-store-by-id.usecase';
import { GetStoresUseCase } from '../../usecases/store/get-stores.usecase';
import { UpdateStoreUseCase } from '../../usecases/store/update-store.usecase';
import { StoreController } from './store.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
  ],
  controllers: [StoreController],
  providers: [
    {
      provide: STORE_REPOSITORY,
      useClass: StoreRepository,
    },
    CreateStoreUseCase,
    GetStoresUseCase,
    GetStoreByIdUseCase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,
  ],
})
export class StoreModule {}
