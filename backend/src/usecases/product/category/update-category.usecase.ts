import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductCategoryDto } from '../../../controllers/product-category/dto/update-product-category.dto';
import { ProductCategoryEntity } from '../../../entities/product';
import {
  IProductCategoryRepository,
  PRODUCT_CATEGORY_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-category-repository';

@Injectable()
export class UpdateProductCategoryUseCase {
  constructor(
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly repository: IProductCategoryRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductCategoryDto,
  ): Promise<ProductCategoryEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductCategoryEntity.fromUpdateProductCategoryDto(
      existing,
      dto,
    );
    const updated = await this.repository.update(id, entity);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
