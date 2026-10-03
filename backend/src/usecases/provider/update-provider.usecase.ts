import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProviderDto } from '../../controllers/provider/dto/update-provider.dto';
import { ProviderEntity } from '../../entities/provider';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';

@Injectable()
export class UpdateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(id: string, dto: UpdateProviderDto): Promise<ProviderEntity> {
    const provider = await this.providerRepository.findById(id);
    if (!provider) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    const updatedEntity = ProviderEntity.fromUpdateProviderDto(provider, dto);
    const updated = await this.providerRepository.update(id, updatedEntity);
    if (!updated) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    return updated;
  }
}
