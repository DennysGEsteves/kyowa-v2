import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductUnitEntity } from '../../../entities/product';
import {
  IProductUnitRepository,
  PRODUCT_UNIT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-unit-repository';

@Injectable()
export class GetProductUnitByIdUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly repository: IProductUnitRepository,
  ) {}

  async execute(id: string): Promise<ProductUnitEntity> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException('Registro não encontrado');
    }
    return record;
  }
}
