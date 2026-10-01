import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProductUnitRepository,
  PRODUCT_UNIT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-unit-repository';

@Injectable()
export class DeleteProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly repository: IProductUnitRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Registro não encontrado');
    }
  }
}
