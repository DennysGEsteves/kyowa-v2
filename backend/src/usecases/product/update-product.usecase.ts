import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from '../../entities/product';
import {
  IProductRepository,
  UpdateProductData,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';
import { toNameFilter } from '../../util/string/name-filter';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string, data: UpdateProductData): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const payload: UpdateProductData = { ...data };
    if (data.name !== undefined && data.nameFilter === undefined) {
      payload.nameFilter = toNameFilter(data.name);
    }

    const updated = await this.productRepository.update(id, payload);
    if (!updated) {
      throw new NotFoundException('Produto não encontrado');
    }
    return updated;
  }
}
