import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProductOriginRepository,
  PRODUCT_ORIGIN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-origin-repository';

@Injectable()
export class DeleteProductOriginUseCase {
  constructor(
    @Inject(PRODUCT_ORIGIN_REPOSITORY)
    private readonly repository: IProductOriginRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Registro não encontrado');
    }
  }
}
