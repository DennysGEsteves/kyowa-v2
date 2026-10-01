import { Inject, Injectable } from '@nestjs/common';
import { ProductShapeEntity } from '../../../entities/product';
import {
  IProductShapeRepository,
  PRODUCT_SHAPE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-shape-repository';

@Injectable()
export class GetProductShapesUseCase {
  constructor(
    @Inject(PRODUCT_SHAPE_REPOSITORY)
    private readonly repository: IProductShapeRepository,
  ) {}

  async execute(): Promise<ProductShapeEntity[]> {
    return this.repository.findAll();
  }
}
