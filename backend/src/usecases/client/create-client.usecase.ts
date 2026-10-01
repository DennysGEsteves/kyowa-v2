import { Inject, Injectable } from '@nestjs/common';
import { ClientEntity } from '../../entities/client';
import {
  CLIENT_REPOSITORY,
  CreateClientData,
  IClientRepository,
} from '../../repositories/client/interfaces/i-client-repository';
import { toNameFilter } from '../../util/string/name-filter';

@Injectable()
export class CreateClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(data: CreateClientData): Promise<ClientEntity> {
    const nameFilter = data.nameFilter?.trim()
      ? data.nameFilter
      : toNameFilter(data.name);

    return this.clientRepository.create({
      ...data,
      nameFilter,
      entry: data.entry ?? new Date(),
    });
  }
}
