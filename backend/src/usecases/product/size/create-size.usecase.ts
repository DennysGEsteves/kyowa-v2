import { Inject, Injectable } from '@nestjs/common';
import { ProductSizeEntity } from '../../../entities/product';
import {
  CreateProductSizeData,
  IProductSizeRepository,
  PRODUCT_SIZE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-size-repository';

@Injectable()
export class CreateProductSizeUseCase {
  constructor(
    @Inject(PRODUCT_SIZE_REPOSITORY)
    private readonly repository: IProductSizeRepository,
  ) {}

  async execute(data: CreateProductSizeData): Promise<ProductSizeEntity> {
    return this.repository.create(data);
  }
}
