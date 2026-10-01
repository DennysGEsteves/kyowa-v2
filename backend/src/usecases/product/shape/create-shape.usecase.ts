import { Inject, Injectable } from '@nestjs/common';
import { ProductShapeEntity } from '../../../entities/product';
import {
  CreateProductShapeData,
  IProductShapeRepository,
  PRODUCT_SHAPE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-shape-repository';

@Injectable()
export class CreateProductShapeUseCase {
  constructor(
    @Inject(PRODUCT_SHAPE_REPOSITORY)
    private readonly repository: IProductShapeRepository,
  ) {}

  async execute(data: CreateProductShapeData): Promise<ProductShapeEntity> {
    return this.repository.create(data);
  }
}
