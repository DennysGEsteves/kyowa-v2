import { Inject, Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from '../../../controllers/product-category/dto/create-product-category.dto';
import { ProductCategoryEntity } from '../../../entities/product';
import {
  IProductCategoryRepository,
  PRODUCT_CATEGORY_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-category-repository';

@Injectable()
export class CreateProductCategoryUseCase {
  constructor(
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly repository: IProductCategoryRepository,
  ) {}

  async execute(dto: CreateProductCategoryDto): Promise<ProductCategoryEntity> {
    const entity = ProductCategoryEntity.fromCreateProductCategoryDto(dto);
    return this.repository.create(entity);
  }
}
