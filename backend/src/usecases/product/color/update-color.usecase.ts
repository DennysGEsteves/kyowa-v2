import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductColorEntity } from '../../../entities/product';
import {
  IProductColorRepository,
  UpdateProductColorData,
  PRODUCT_COLOR_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-color-repository';

@Injectable()
export class UpdateProductColorUseCase {
  constructor(
    @Inject(PRODUCT_COLOR_REPOSITORY)
    private readonly repository: IProductColorRepository,
  ) {}

  async execute(id: string, data: UpdateProductColorData): Promise<ProductColorEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
