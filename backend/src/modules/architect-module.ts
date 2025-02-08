import { Module } from '@nestjs/common';
import {
  CreateArchitectUseCase,
  GetArchitectsUseCase,
  UpdateArchitectUseCase,
  DeleteArchitectUseCase,
} from 'src/usecases/architect';
import { ArchitectController } from 'src/controllers/architect/architect-controller';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';
import { ArchitectRepository } from 'src/repositories/architect/architect-repository';

@Module({
  imports: [],
  controllers: [ArchitectController],
  providers: [
    CreateArchitectUseCase,
    GetArchitectsUseCase,
    UpdateArchitectUseCase,
    DeleteArchitectUseCase,
    { provide: IArchitectRepository, useClass: ArchitectRepository },
  ],
  exports: [IArchitectRepository],
})
export class ArchitectModule {}
