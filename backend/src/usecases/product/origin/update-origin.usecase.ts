import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductOriginEntity } from '../../../entities/product';
import {
  IProductOriginRepository,
  UpdateProductOriginData,
  PRODUCT_ORIGIN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-origin-repository';

@Injectable()
export class UpdateProductOriginUseCase {
  constructor(
    @Inject(PRODUCT_ORIGIN_REPOSITORY)
    private readonly repository: IProductOriginRepository,
  ) {}

  async execute(id: string, data: UpdateProductOriginData): Promise<ProductOriginEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
