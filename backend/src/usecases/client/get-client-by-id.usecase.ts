import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from '../../entities/client';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../../repositories/client/interfaces/i-client-repository';

@Injectable()
export class GetClientByIdUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string): Promise<ClientEntity> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return client;
  }
}
