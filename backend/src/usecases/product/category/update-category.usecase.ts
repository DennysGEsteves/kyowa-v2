import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductCategoryEntity } from '../../../entities/product';
import {
  IProductCategoryRepository,
  UpdateProductCategoryData,
  PRODUCT_CATEGORY_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-category-repository';

@Injectable()
export class UpdateProductCategoryUseCase {
  constructor(
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly repository: IProductCategoryRepository,
  ) {}

  async execute(id: string, data: UpdateProductCategoryData): Promise<ProductCategoryEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
