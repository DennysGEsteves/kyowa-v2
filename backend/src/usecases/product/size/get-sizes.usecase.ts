import { Inject, Injectable } from '@nestjs/common';
import { ProductSizeEntity } from '../../../entities/product';
import {
  IProductSizeRepository,
  PRODUCT_SIZE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-size-repository';

@Injectable()
export class GetProductSizesUseCase {
  constructor(
    @Inject(PRODUCT_SIZE_REPOSITORY)
    private readonly repository: IProductSizeRepository,
  ) {}

  async execute(): Promise<ProductSizeEntity[]> {
    return this.repository.findAll();
  }
}
