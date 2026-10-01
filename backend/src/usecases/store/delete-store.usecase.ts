import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IStoreRepository,
  STORE_REPOSITORY,
} from '../../repositories/store/interfaces/i-store-repository';

@Injectable()
export class DeleteStoreUseCase {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.storeRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Loja não encontrada');
    }
  }
}
