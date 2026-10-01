import { Inject, Injectable } from '@nestjs/common';
import { ProductHeightEntity } from '../../../entities/product';
import {
  CreateProductHeightData,
  IProductHeightRepository,
  PRODUCT_HEIGHT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-height-repository';

@Injectable()
export class CreateProductHeightUseCase {
  constructor(
    @Inject(PRODUCT_HEIGHT_REPOSITORY)
    private readonly repository: IProductHeightRepository,
  ) {}

  async execute(data: CreateProductHeightData): Promise<ProductHeightEntity> {
    return this.repository.create(data);
  }
}
