import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';
import { StoreModule } from '../store/store.module';
import { UserModule } from '../user/user.module';
import { SEAL_REPOSITORY } from '../../repositories/seal/interfaces/i-seal-repository';
import { SealRepository } from '../../repositories/seal/seal.repository';
import { Seal, SealSchema } from '../../repositories/seal/schemas/seal.schema';
import { GetSealDetailUseCase } from '../../usecases/seal/get-seal-detail.usecase';
import { SearchSealsByNumberUseCase } from '../../usecases/seal/search-seals-by-number.usecase';
import { UpdateSealUseCase } from '../../usecases/seal/update-seal.usecase';
import { SealController } from './seal.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seal.name, schema: SealSchema }]),
    ProductModule,
    StoreModule,
    UserModule,
  ],
  controllers: [SealController],
  providers: [
    {
      provide: SEAL_REPOSITORY,
      useClass: SealRepository,
    },
    SearchSealsByNumberUseCase,
    GetSealDetailUseCase,
    UpdateSealUseCase,
  ],
  exports: [SEAL_REPOSITORY],
})
export class SealModule {}
