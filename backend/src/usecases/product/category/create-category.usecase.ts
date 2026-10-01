import { Inject, Injectable } from '@nestjs/common';
import { ProductCategoryEntity } from '../../../entities/product';
import {
  CreateProductCategoryData,
  IProductCategoryRepository,
  PRODUCT_CATEGORY_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-category-repository';

@Injectable()
export class CreateProductCategoryUseCase {
  constructor(
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly repository: IProductCategoryRepository,
  ) {}

  async execute(data: CreateProductCategoryData): Promise<ProductCategoryEntity> {
    return this.repository.create(data);
  }
}
