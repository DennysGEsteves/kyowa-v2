import { Module } from '@nestjs/common';
import { ArchitectResolver } from './architect.resolver';
import {
  CreateArchitectUseCase,
  GetArchitectsUseCase,
  UpdateArchitectUseCase,
} from 'src/usecases/architect';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';
import { ArchitectRepository } from 'src/repositories/architect/architect-repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    ArchitectResolver,
    CreateArchitectUseCase,
    GetArchitectsUseCase,
    UpdateArchitectUseCase,
    { provide: IArchitectRepository, useClass: ArchitectRepository },
  ],
})
export class ArchitectModule {}
