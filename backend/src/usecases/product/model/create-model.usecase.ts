import { Inject, Injectable } from '@nestjs/common';
import { ProductModelEntity } from '../../../entities/product';
import {
  CreateProductModelData,
  IProductModelRepository,
  PRODUCT_MODEL_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-model-repository';

@Injectable()
export class CreateProductModelUseCase {
  constructor(
    @Inject(PRODUCT_MODEL_REPOSITORY)
    private readonly repository: IProductModelRepository,
  ) {}

  async execute(data: CreateProductModelData): Promise<ProductModelEntity> {
    return this.repository.create(data);
  }
}
