import { Module } from '@nestjs/common';
import {
  CreateClientUseCase,
  GetClientsUseCase,
  UpdateClientUseCase,
  DeleteClientUseCase,
} from 'src/usecases/client';
import { ClientController } from 'src/controllers/client/client-controller';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';
import { ClientRepository } from 'src/repositories/client/client-repository';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [
    CreateClientUseCase,
    GetClientsUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
    { provide: IClientRepository, useClass: ClientRepository },
  ],
  exports: [IClientRepository],
})
export class ClientModule {}
