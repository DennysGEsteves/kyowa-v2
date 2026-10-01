import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductUnitEntity } from '../../../entities/product';
import {
  IProductUnitRepository,
  UpdateProductUnitData,
  PRODUCT_UNIT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-unit-repository';

@Injectable()
export class UpdateProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly repository: IProductUnitRepository,
  ) {}

  async execute(id: string, data: UpdateProductUnitData): Promise<ProductUnitEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
