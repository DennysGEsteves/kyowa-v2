import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from '../../entities/client';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
  UpdateClientData,
} from '../../repositories/client/interfaces/i-client-repository';
import { toNameFilter } from '../../util/string/name-filter';

@Injectable()
export class UpdateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string, data: UpdateClientData): Promise<ClientEntity> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }

    const payload: UpdateClientData = { ...data };

    if (data.name !== undefined && data.nameFilter === undefined) {
      payload.nameFilter = toNameFilter(data.name);
    }

    const updated = await this.clientRepository.update(id, payload);
    if (!updated) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return updated;
  }
}
