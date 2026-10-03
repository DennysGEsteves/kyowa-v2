import { Inject, Injectable } from '@nestjs/common';
import { CreateStoreDto } from '../../controllers/store/dto/create-store.dto';
import { StoreEntity } from '../../entities/store';
import {
  IStoreRepository,
  STORE_REPOSITORY,
} from '../../repositories/store/interfaces/i-store-repository';

@Injectable()
export class CreateStoreUseCase {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  execute(dto: CreateStoreDto): Promise<StoreEntity> {
    const store = StoreEntity.fromCreateStoreDto(dto);
    return this.storeRepository.create(store);
  }
}
