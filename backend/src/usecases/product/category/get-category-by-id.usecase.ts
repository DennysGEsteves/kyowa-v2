import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoryEntity } from '../../../entities/product';
import {
  IProductCategoryRepository,
  PRODUCT_CATEGORY_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-category-repository';

@Injectable()
export class GetProductCategoryByIdUseCase {
  constructor(
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly repository: IProductCategoryRepository,
  ) {}

  async execute(id: string): Promise<ProductCategoryEntity> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException('Registro não encontrado');
    }
    return record;
  }
}
