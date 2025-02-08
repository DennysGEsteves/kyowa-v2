import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/entities';
import { ClientMapper } from 'src/adapters/mappers/client';
import { UpsertClientDTO } from 'src/controllers/client/dtos';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';

@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(dto: UpsertClientDTO): Promise<ClientEntity> {
    const newClient = ClientMapper.fromUpsertClientDTO(dto);
    const clientDB = await this.clientRepository.create(newClient);
    return ClientMapper.fromDB(clientDB);
  }
}
