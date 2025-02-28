import { Module } from '@nestjs/common';
import { StoreResolver } from './store.resolver';
import {
  CreateStoreUseCase,
  GetStoresUseCase,
  UpdateStoreUseCase,
} from 'src/usecases/store';
import { IStoreRepository } from 'src/repositories/store/interfaces/i-store-repository';
import { StoreRepository } from 'src/repositories/store/store-repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    StoreResolver,
    CreateStoreUseCase,
    GetStoresUseCase,
    UpdateStoreUseCase,
    { provide: IStoreRepository, useClass: StoreRepository },
  ],
})
export class StoreModule {}
