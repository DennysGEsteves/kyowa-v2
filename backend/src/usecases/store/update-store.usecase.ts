import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StoreEntity } from '../../entities/store';
import {
  IStoreRepository,
  STORE_REPOSITORY,
  UpdateStoreData,
} from '../../repositories/store/interfaces/i-store-repository';

@Injectable()
export class UpdateStoreUseCase {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(id: string, data: UpdateStoreData): Promise<StoreEntity> {
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    const updated = await this.storeRepository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Loja não encontrada');
    }
    return updated;
  }
}
