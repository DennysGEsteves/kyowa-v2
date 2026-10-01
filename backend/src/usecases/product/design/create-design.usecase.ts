import { Inject, Injectable } from '@nestjs/common';
import { ProductDesignEntity } from '../../../entities/product';
import {
  CreateProductDesignData,
  IProductDesignRepository,
  PRODUCT_DESIGN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-design-repository';

@Injectable()
export class CreateProductDesignUseCase {
  constructor(
    @Inject(PRODUCT_DESIGN_REPOSITORY)
    private readonly repository: IProductDesignRepository,
  ) {}

  async execute(data: CreateProductDesignData): Promise<ProductDesignEntity> {
    return this.repository.create(data);
  }
}
