import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StoreEntity } from '../../entities/store';
import {
  IStoreRepository,
  STORE_REPOSITORY,
} from '../../repositories/store/interfaces/i-store-repository';

@Injectable()
export class GetStoreByIdUseCase {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(id: string): Promise<StoreEntity> {
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }
    return store;
  }
}
