import { Injectable } from '@nestjs/common';
import { ClientMapper } from 'src/adapters/mappers/client';
import { ClientEntity } from 'src/entities';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';

@Injectable()
export class GetClientByIdUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(clientId: number): Promise<ClientEntity> {
    const clientDB = await this.clientRepository.findById(clientId);
    return ClientMapper.fromDB(clientDB);
  }
}
