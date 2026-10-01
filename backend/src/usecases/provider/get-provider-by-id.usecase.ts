import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProviderEntity } from '../../entities/provider';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';

@Injectable()
export class GetProviderByIdUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(id: string): Promise<ProviderEntity> {
    const provider = await this.providerRepository.findById(id);
    if (!provider) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return provider;
  }
}
