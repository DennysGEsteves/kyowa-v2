import { Inject, Injectable } from '@nestjs/common';
import { ProductOriginEntity } from '../../../entities/product';
import {
  IProductOriginRepository,
  PRODUCT_ORIGIN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-origin-repository';

@Injectable()
export class GetProductOriginsUseCase {
  constructor(
    @Inject(PRODUCT_ORIGIN_REPOSITORY)
    private readonly repository: IProductOriginRepository,
  ) {}

  async execute(): Promise<ProductOriginEntity[]> {
    return this.repository.findAll();
  }
}
