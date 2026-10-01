import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProviderEntity } from '../../entities/provider';
import {
  IProviderRepository,
  UpdateProviderData,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';
import { toNameFilter } from '../../util/string/name-filter';

@Injectable()
export class UpdateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(id: string, data: UpdateProviderData): Promise<ProviderEntity> {
    const provider = await this.providerRepository.findById(id);
    if (!provider) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    const payload: UpdateProviderData = { ...data };

    if (data.name !== undefined && data.nameFilter === undefined) {
      payload.nameFilter = toNameFilter(data.name);
    }

    const updated = await this.providerRepository.update(id, payload);
    if (!updated) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return updated;
  }
}
