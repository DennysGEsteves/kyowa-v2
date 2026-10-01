import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductShapeEntity } from '../../../entities/product';
import {
  IProductShapeRepository,
  PRODUCT_SHAPE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-shape-repository';

@Injectable()
export class GetProductShapeByIdUseCase {
  constructor(
    @Inject(PRODUCT_SHAPE_REPOSITORY)
    private readonly repository: IProductShapeRepository,
  ) {}

  async execute(id: string): Promise<ProductShapeEntity> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException('Registro não encontrado');
    }
    return record;
  }
}
