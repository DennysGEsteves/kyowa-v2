import { Inject, Injectable } from '@nestjs/common';
import { ProductColorEntity } from '../../../entities/product';
import {
  IProductColorRepository,
  PRODUCT_COLOR_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-color-repository';

@Injectable()
export class GetProductColorsUseCase {
  constructor(
    @Inject(PRODUCT_COLOR_REPOSITORY)
    private readonly repository: IProductColorRepository,
  ) {}

  async execute(): Promise<ProductColorEntity[]> {
    return this.repository.findAll();
  }
}
