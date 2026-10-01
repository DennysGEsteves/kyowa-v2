import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductOriginEntity } from '../../../entities/product';
import {
  IProductOriginRepository,
  PRODUCT_ORIGIN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-origin-repository';

@Injectable()
export class GetProductOriginByIdUseCase {
  constructor(
    @Inject(PRODUCT_ORIGIN_REPOSITORY)
    private readonly repository: IProductOriginRepository,
  ) {}

  async execute(id: string): Promise<ProductOriginEntity> {
    const record = await this.repository.findById(id);
    if (!record) {
      throw new NotFoundException('Registro não encontrado');
    }
    return record;
  }
}
