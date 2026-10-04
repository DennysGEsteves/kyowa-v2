import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PROVIDER_REPOSITORY } from '../../repositories/provider/interfaces/i-provider-repository';
import {
  Provider,
  ProviderSchema,
} from '../../repositories/provider/schemas/provider.schema';
import { ProviderRepository } from '../../repositories/provider/provider.repository';
import { CreateProviderUseCase } from '../../usecases/provider/create-provider.usecase';
import { DeleteProviderUseCase } from '../../usecases/provider/delete-provider.usecase';
import { GetProviderByIdUseCase } from '../../usecases/provider/get-provider-by-id.usecase';
import { GetProvidersUseCase } from '../../usecases/provider/get-providers.usecase';
import { ListProvidersPaginatedUseCase } from '../../usecases/provider/list-providers-paginated.usecase';
import { UpdateProviderUseCase } from '../../usecases/provider/update-provider.usecase';
import { ProviderController } from './provider.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provider.name, schema: ProviderSchema },
    ]),
  ],
  controllers: [ProviderController],
  providers: [
    {
      provide: PROVIDER_REPOSITORY,
      useClass: ProviderRepository,
    },
    CreateProviderUseCase,
    GetProvidersUseCase,
    ListProvidersPaginatedUseCase,
    GetProviderByIdUseCase,
    UpdateProviderUseCase,
    DeleteProviderUseCase,
  ],
  exports: [PROVIDER_REPOSITORY],
})
export class ProviderModule {}
