import { Inject, Injectable } from '@nestjs/common';
import { CreateClientDto } from '../../controllers/client/dto/create-client.dto';
import { ClientEntity } from '../../entities/client';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../../repositories/client/interfaces/i-client-repository';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(dto: CreateClientDto): Promise<ClientEntity> {
    const client = ClientEntity.fromCreateClientDto(dto);
    return this.clientRepository.create(client);
  }
}
