import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductShapeEntity } from '../../../entities/product';
import {
  IProductShapeRepository,
  UpdateProductShapeData,
  PRODUCT_SHAPE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-shape-repository';

@Injectable()
export class UpdateProductShapeUseCase {
  constructor(
    @Inject(PRODUCT_SHAPE_REPOSITORY)
    private readonly repository: IProductShapeRepository,
  ) {}

  async execute(id: string, data: UpdateProductShapeData): Promise<ProductShapeEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
