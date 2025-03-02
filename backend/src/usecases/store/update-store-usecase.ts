import { Injectable } from '@nestjs/common';
import { StoreMapper } from 'src/adapters/mappers/store';
import { UpsertStoreDTO } from 'src/controllers/store/dto';
import { StoreEntity } from 'src/entities/store';
import { IStoreRepository } from 'src/repositories/store/interfaces';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private readonly storeRepository: IStoreRepository) {}

  public async execute(dto: UpsertStoreDTO): Promise<StoreEntity> {
    try {
      const newStore = StoreMapper.fromUpsertStoreDTO(dto);
      const storeDB = await this.storeRepository.update(newStore);
      return StoreMapper.fromDB(storeDB);
    } catch (e) {
      console.log(e);
    }
  }
}
