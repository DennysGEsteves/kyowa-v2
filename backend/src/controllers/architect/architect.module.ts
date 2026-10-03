import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ARCHITECT_REPOSITORY } from '../../repositories/architect/interfaces/i-architect-repository';
import { ArchitectRepository } from '../../repositories/architect/architect.repository';
import {
  Architect,
  ArchitectSchema,
} from '../../repositories/architect/schemas/architect.schema';
import { CreateArchitectUseCase } from '../../usecases/architect/create-architect.usecase';
import { DeleteArchitectUseCase } from '../../usecases/architect/delete-architect.usecase';
import { GetArchitectByIdUseCase } from '../../usecases/architect/get-architect-by-id.usecase';
import { GetArchitectsUseCase } from '../../usecases/architect/get-architects.usecase';
import { ListArchitectsPaginatedUseCase } from '../../usecases/architect/list-architects-paginated.usecase';
import { UpdateArchitectUseCase } from '../../usecases/architect/update-architect.usecase';
import { ArchitectController } from './architect.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Architect.name, schema: ArchitectSchema },
    ]),
  ],
  controllers: [ArchitectController],
  providers: [
    {
      provide: ARCHITECT_REPOSITORY,
      useClass: ArchitectRepository,
    },
    CreateArchitectUseCase,
    GetArchitectsUseCase,
    ListArchitectsPaginatedUseCase,
    GetArchitectByIdUseCase,
    UpdateArchitectUseCase,
    DeleteArchitectUseCase,
  ],
})
export class ArchitectModule {}
