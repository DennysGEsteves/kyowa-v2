import { Injectable, Scope } from '@nestjs/common';
import { ClientEntity } from 'src/entities';
import { ClientMapper } from 'src/adapters/mappers/client';
// import { UpsertClientDTO } from 'src/controllers/client/dtos';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';
import { UpsertClientDTO } from 'src/controllers/client/dto';

@Injectable({ scope: Scope.REQUEST })
export class UpdateClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(dto: UpsertClientDTO): Promise<ClientEntity> {
    const client = ClientMapper.fromUpsertClientDTO(dto);
    await this.clientRepository.update(client);
    return client;
  }
}
