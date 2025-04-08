import { Injectable } from '@nestjs/common';
import { StoreMapper } from 'src/adapters/mappers/store';
import { StoreEntity } from 'src/entities';
import { IStoreRepository } from 'src/repositories/store/interfaces/i-store-repository';

@Injectable()
export class GetStoreByIdUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  async execute(storeId: number): Promise<StoreEntity> {
    const storeDB = await this.storeRepository.findById(storeId);
    return StoreMapper.fromDB(storeDB);
  }
}
