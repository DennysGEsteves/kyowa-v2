import { Inject, Injectable } from '@nestjs/common';
import { ProductUnitEntity } from '../../../entities/product';
import {
  CreateProductUnitData,
  IProductUnitRepository,
  PRODUCT_UNIT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-unit-repository';

@Injectable()
export class CreateProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly repository: IProductUnitRepository,
  ) {}

  async execute(data: CreateProductUnitData): Promise<ProductUnitEntity> {
    return this.repository.create(data);
  }
}
