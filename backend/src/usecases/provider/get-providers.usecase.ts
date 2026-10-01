import { Inject, Injectable } from '@nestjs/common';
import { ProviderEntity } from '../../entities/provider';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';

@Injectable()
export class GetProvidersUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(): Promise<ProviderEntity[]> {
    return this.providerRepository.findAll();
  }
}
