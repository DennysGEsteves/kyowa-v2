import { Inject, Injectable } from '@nestjs/common';
import { ProductModelEntity } from '../../../entities/product';
import {
  IProductModelRepository,
  PRODUCT_MODEL_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-model-repository';

@Injectable()
export class GetProductModelsUseCase {
  constructor(
    @Inject(PRODUCT_MODEL_REPOSITORY)
    private readonly repository: IProductModelRepository,
  ) {}

  async execute(): Promise<ProductModelEntity[]> {
    return this.repository.findAll();
  }
}
