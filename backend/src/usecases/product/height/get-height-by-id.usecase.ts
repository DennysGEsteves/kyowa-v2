import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductHeightEntity } from '../../../entities/product';
import {
  IProductHeightRepository,
  PRODUCT_HEIGHT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-height-repository';

@Injectable()
export class GetProductHeightByIdUseCase {
  constructor(
    @Inject(PRODUCT_HEIGHT_REPOSITORY)
    private readonly repository: IProductHeightRepository,
  ) {}

  async execute(id: string): Promise<ProductHeightEntity> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException('Registro não encontrado');
    }
    return record;
  }
}
