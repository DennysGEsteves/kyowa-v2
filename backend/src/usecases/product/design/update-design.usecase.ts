import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductDesignEntity } from '../../../entities/product';
import {
  IProductDesignRepository,
  UpdateProductDesignData,
  PRODUCT_DESIGN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-design-repository';

@Injectable()
export class UpdateProductDesignUseCase {
  constructor(
    @Inject(PRODUCT_DESIGN_REPOSITORY)
    private readonly repository: IProductDesignRepository,
  ) {}

  async execute(id: string, data: UpdateProductDesignData): Promise<ProductDesignEntity> {
    const updated = await this.repository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
