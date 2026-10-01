import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';

@Injectable()
export class DeleteProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.providerRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
  }
}
