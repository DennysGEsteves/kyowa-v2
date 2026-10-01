import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductModelEntity } from '../../../entities/product';
import {
  IProductModelRepository,
  PRODUCT_MODEL_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-model-repository';

@Injectable()
export class GetProductModelByIdUseCase {
  constructor(
    @Inject(PRODUCT_MODEL_REPOSITORY)
    private readonly repository: IProductModelRepository,
  ) {}

  async execute(id: string): Promise<ProductModelEntity> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException('Registro não encontrado');
    }
    return record;
  }
}
