import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductUnitDto } from '../../../controllers/product-unit/dto/update-product-unit.dto';
import { ProductUnitEntity } from '../../../entities/product';
import {
  IProductUnitRepository,
  PRODUCT_UNIT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-unit-repository';

@Injectable()
export class UpdateProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly repository: IProductUnitRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductUnitDto,
  ): Promise<ProductUnitEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductUnitEntity.fromUpdateProductUnitDto(existing, dto);
    const updated = await this.repository.update(id, entity);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
