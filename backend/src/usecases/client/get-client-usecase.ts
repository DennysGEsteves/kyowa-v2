import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/entities';
import { ClientMapper } from 'src/adapters/mappers/client';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';

@Injectable()
export class GetClientsUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(): Promise<ClientEntity[]> {
    const clientsDB = await this.clientRepository.findAll();
    const clients = ClientMapper.fromDBList(clientsDB);
    return clients;
  }
}
