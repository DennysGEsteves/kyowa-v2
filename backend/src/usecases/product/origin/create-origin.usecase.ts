import { Inject, Injectable } from '@nestjs/common';
import { ProductOriginEntity } from '../../../entities/product';
import {
  CreateProductOriginData,
  IProductOriginRepository,
  PRODUCT_ORIGIN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-origin-repository';

@Injectable()
export class CreateProductOriginUseCase {
  constructor(
    @Inject(PRODUCT_ORIGIN_REPOSITORY)
    private readonly repository: IProductOriginRepository,
  ) {}

  async execute(data: CreateProductOriginData): Promise<ProductOriginEntity> {
    return this.repository.create(data);
  }
}
