import { Inject, Injectable } from '@nestjs/common';
import { ProductEntity } from '../../entities/product';
import {
  CreateProductData,
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';
import { toNameFilter } from '../../util/string/name-filter';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(data: CreateProductData): Promise<ProductEntity> {
    const nameFilter = data.nameFilter?.trim()
      ? data.nameFilter
      : toNameFilter(data.name);

    return this.productRepository.create({
      ...data,
      nameFilter,
    });
  }
}
