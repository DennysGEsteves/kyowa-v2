import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStoreDto } from '../../controllers/store/dto/update-store.dto';
import { StoreEntity } from '../../entities/store';
import {
  IStoreRepository,
  STORE_REPOSITORY,
} from '../../repositories/store/interfaces/i-store-repository';

@Injectable()
export class UpdateStoreUseCase {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(id: string, dto: UpdateStoreDto): Promise<StoreEntity> {
    const store = await this.storeRepository.findById(id);
    if (!store) {
      throw new NotFoundException('Loja não encontrada');
    }

    const updatedEntity = StoreEntity.fromUpdateStoreDto(store, dto);
    const updated = await this.storeRepository.update(id, updatedEntity);
    if (!updated) {
      throw new NotFoundException('Loja não encontrada');
    }
    return updated;
  }
}
