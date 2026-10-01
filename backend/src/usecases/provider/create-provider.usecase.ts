import { Inject, Injectable } from '@nestjs/common';
import { ProviderEntity } from '../../entities/provider';
import {
  CreateProviderData,
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';
import { toNameFilter } from '../../util/string/name-filter';

@Injectable()
export class CreateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(data: CreateProviderData): Promise<ProviderEntity> {
    const nameFilter = data.nameFilter?.trim()
      ? data.nameFilter
      : toNameFilter(data.name);

    return this.providerRepository.create({
      ...data,
      nameFilter,
    });
  }
}
