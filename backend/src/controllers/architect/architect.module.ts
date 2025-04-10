import { Module } from '@nestjs/common';
import { ArchitectResolver } from './architect.resolver';
import {
  CreateArchitectUseCase,
  GetArchitectsUseCase,
  UpdateArchitectUseCase,
  GetArchitectByIdUseCase,
} from 'src/usecases/architect';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';
import { ArchitectRepository } from 'src/repositories/architect/architect-repository';
@Module({
  providers: [
    ArchitectResolver,
    CreateArchitectUseCase,
    GetArchitectsUseCase,
    UpdateArchitectUseCase,
    GetArchitectByIdUseCase,
    { provide: IArchitectRepository, useClass: ArchitectRepository },
  ],
})
export class ArchitectModule {}
