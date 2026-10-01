import { Inject, Injectable } from '@nestjs/common';
import { ProductCategoryEntity } from '../../../entities/product';
import {
  IProductCategoryRepository,
  PRODUCT_CATEGORY_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-category-repository';

@Injectable()
export class GetProductCategoriesUseCase {
  constructor(
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly repository: IProductCategoryRepository,
  ) {}

  async execute(): Promise<ProductCategoryEntity[]> {
    return this.repository.findAll();
  }
}
