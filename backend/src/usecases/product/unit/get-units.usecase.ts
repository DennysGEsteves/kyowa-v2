import { Inject, Injectable } from '@nestjs/common';
import { ProductUnitEntity } from '../../../entities/product';
import {
  IProductUnitRepository,
  PRODUCT_UNIT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-unit-repository';

@Injectable()
export class GetProductUnitsUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly repository: IProductUnitRepository,
  ) {}

  async execute(): Promise<ProductUnitEntity[]> {
    return this.repository.findAll();
  }
}
