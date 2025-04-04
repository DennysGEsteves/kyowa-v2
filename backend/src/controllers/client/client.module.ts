import { Module } from '@nestjs/common';
import { ClientResolver } from './client.resolver';
import {
  CreateClientUseCase,
  GetClientsUseCase,
  UpdateClientUseCase,
  GetClientByIdUseCase,
  DeleteClientUseCase,
} from 'src/usecases/client';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';
import { ClientRepository } from 'src/repositories/client/client-repository';

@Module({
  providers: [
    ClientResolver,
    CreateClientUseCase,
    GetClientsUseCase,
    UpdateClientUseCase,
    GetClientByIdUseCase,
    DeleteClientUseCase,
    { provide: IClientRepository, useClass: ClientRepository },
  ],
})
export class ClientModule {}
