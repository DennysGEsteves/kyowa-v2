import { Inject, Injectable } from '@nestjs/common';
import { ProductHeightEntity } from '../../../entities/product';
import {
  IProductHeightRepository,
  PRODUCT_HEIGHT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-height-repository';

@Injectable()
export class GetProductHeightsUseCase {
  constructor(
    @Inject(PRODUCT_HEIGHT_REPOSITORY)
    private readonly repository: IProductHeightRepository,
  ) {}

  async execute(): Promise<ProductHeightEntity[]> {
    return this.repository.findAll();
  }
}
