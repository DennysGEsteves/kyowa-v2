import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductModelEntity } from '../../../entities/product';
import {
  IProductModelRepository,
  UpdateProductModelData,
  PRODUCT_MODEL_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-model-repository';

@Injectable()
export class UpdateProductModelUseCase {
  constructor(
    @Inject(PRODUCT_MODEL_REPOSITORY)
    private readonly repository: IProductModelRepository,
  ) {}

  async execute(id: string, data: UpdateProductModelData): Promise<ProductModelEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
