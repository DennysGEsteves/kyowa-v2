import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductHeightEntity } from '../../../entities/product';
import {
  IProductHeightRepository,
  UpdateProductHeightData,
  PRODUCT_HEIGHT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-height-repository';

@Injectable()
export class UpdateProductHeightUseCase {
  constructor(
    @Inject(PRODUCT_HEIGHT_REPOSITORY)
    private readonly repository: IProductHeightRepository,
  ) {}

  async execute(id: string, data: UpdateProductHeightData): Promise<ProductHeightEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
