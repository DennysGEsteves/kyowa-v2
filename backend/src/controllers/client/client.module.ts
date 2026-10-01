import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CLIENT_REPOSITORY } from '../../repositories/client/interfaces/i-client-repository';
import { ClientRepository } from '../../repositories/client/client.repository';
import {
  Client,
  ClientSchema,
} from '../../repositories/client/schemas/client.schema';
import { CreateClientUseCase } from '../../usecases/client/create-client.usecase';
import { DeleteClientUseCase } from '../../usecases/client/delete-client.usecase';
import { GetClientByIdUseCase } from '../../usecases/client/get-client-by-id.usecase';
import { GetClientsUseCase } from '../../usecases/client/get-clients.usecase';
import { UpdateClientUseCase } from '../../usecases/client/update-client.usecase';
import { ClientController } from './client.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [
    {
      provide: CLIENT_REPOSITORY,
      useClass: ClientRepository,
    },
    CreateClientUseCase,
    GetClientsUseCase,
    GetClientByIdUseCase,
    UpdateClientUseCase,
    DeleteClientUseCase,
  ],
})
export class ClientModule {}
