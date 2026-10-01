import { Inject, Injectable } from '@nestjs/common';
import { ProductColorEntity } from '../../../entities/product';
import {
  CreateProductColorData,
  IProductColorRepository,
  PRODUCT_COLOR_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-color-repository';

@Injectable()
export class CreateProductColorUseCase {
  constructor(
    @Inject(PRODUCT_COLOR_REPOSITORY)
    private readonly repository: IProductColorRepository,
  ) {}

  async execute(data: CreateProductColorData): Promise<ProductColorEntity> {
    return this.repository.create(data);
  }
}
