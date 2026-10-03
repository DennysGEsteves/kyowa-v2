import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDesignDto } from '../../../controllers/product-design/dto/update-product-design.dto';
import { ProductDesignEntity } from '../../../entities/product';
import {
  IProductDesignRepository,
  PRODUCT_DESIGN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-design-repository';

@Injectable()
export class UpdateProductDesignUseCase {
  constructor(
    @Inject(PRODUCT_DESIGN_REPOSITORY)
    private readonly repository: IProductDesignRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductDesignDto,
  ): Promise<ProductDesignEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductDesignEntity.fromUpdateProductDesignDto(
      existing,
      dto,
    );
    const updated = await this.repository.update(id, entity);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
