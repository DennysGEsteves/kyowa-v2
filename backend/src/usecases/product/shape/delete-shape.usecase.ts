import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProductShapeRepository,
  PRODUCT_SHAPE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-shape-repository';

@Injectable()
export class DeleteProductShapeUseCase {
  constructor(
    @Inject(PRODUCT_SHAPE_REPOSITORY)
    private readonly repository: IProductShapeRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Registro não encontrado');
    }
  }
}
