import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IProductDesignRepository,
  PRODUCT_DESIGN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-design-repository';

@Injectable()
export class DeleteProductDesignUseCase {
  constructor(
    @Inject(PRODUCT_DESIGN_REPOSITORY)
    private readonly repository: IProductDesignRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.repository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Registro não encontrado');
    }
  }
}
