import { Inject, Injectable } from '@nestjs/common';
import { CreateProviderDto } from '../../controllers/provider/dto/create-provider.dto';
import { ProviderEntity } from '../../entities/provider';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';

@Injectable()
export class CreateProviderUseCase {
  constructor(
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(dto: CreateProviderDto): Promise<ProviderEntity> {
    const provider = ProviderEntity.fromCreateProviderDto(dto);
    return this.providerRepository.create(provider);
  }
}
