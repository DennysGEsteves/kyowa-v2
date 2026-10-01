import { Inject, Injectable } from '@nestjs/common';
import { ProductDesignEntity } from '../../../entities/product';
import {
  IProductDesignRepository,
  PRODUCT_DESIGN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-design-repository';

@Injectable()
export class GetProductDesignsUseCase {
  constructor(
    @Inject(PRODUCT_DESIGN_REPOSITORY)
    private readonly repository: IProductDesignRepository,
  ) {}

  async execute(): Promise<ProductDesignEntity[]> {
    return this.repository.findAll();
  }
}
