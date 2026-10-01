import { Inject, Injectable } from '@nestjs/common';
import { ClientEntity } from '../../entities/client';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../../repositories/client/interfaces/i-client-repository';

@Injectable()
export class GetClientsUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  execute(): Promise<ClientEntity[]> {
    return this.clientRepository.findAll();
  }
}
