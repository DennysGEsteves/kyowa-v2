import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductSizeEntity } from '../../../entities/product';
import {
  IProductSizeRepository,
  UpdateProductSizeData,
  PRODUCT_SIZE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-size-repository';

@Injectable()
export class UpdateProductSizeUseCase {
  constructor(
    @Inject(PRODUCT_SIZE_REPOSITORY)
    private readonly repository: IProductSizeRepository,
  ) {}

  async execute(id: string, data: UpdateProductSizeData): Promise<ProductSizeEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
