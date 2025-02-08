import { Injectable, Scope } from '@nestjs/common';
import { ClientEntity } from 'src/entities';
import { ClientMapper } from 'src/adapters/mappers/client';
import { UpsertClientDTO } from 'src/controllers/client/dtos';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';

@Injectable({ scope: Scope.REQUEST })
export class UpdateClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(dto: UpsertClientDTO, clientId: number): Promise<ClientEntity> {
    const client = ClientMapper.fromUpsertClientDTO(dto, clientId);
    await this.clientRepository.update(client);
    return client;
  }
}
