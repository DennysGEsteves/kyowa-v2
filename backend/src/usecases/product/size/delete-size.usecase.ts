import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProductSizeRepository,
  PRODUCT_SIZE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-size-repository';

@Injectable()
export class DeleteProductSizeUseCase {
  constructor(
    @Inject(PRODUCT_SIZE_REPOSITORY)
    private readonly repository: IProductSizeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Registro não encontrado');
    }
  }
}
