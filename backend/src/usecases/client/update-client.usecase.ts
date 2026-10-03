import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateClientDto } from '../../controllers/client/dto/update-client.dto';
import { ClientEntity } from '../../entities/client';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../../repositories/client/interfaces/i-client-repository';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string, dto: UpdateClientDto): Promise<ClientEntity> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const updatedEntity = ClientEntity.fromUpdateClientDto(client, dto);
    const updated = await this.clientRepository.update(id, updatedEntity);
    if (!updated) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return updated;
  }
}
