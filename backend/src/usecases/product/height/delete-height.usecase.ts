import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProductHeightRepository,
  PRODUCT_HEIGHT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-height-repository';

@Injectable()
export class DeleteProductHeightUseCase {
  constructor(
    @Inject(PRODUCT_HEIGHT_REPOSITORY)
    private readonly repository: IProductHeightRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Registro não encontrado');
    }
  }
}
