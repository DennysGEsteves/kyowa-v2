import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductShapeDto } from '../../../controllers/product-shape/dto/update-product-shape.dto';
import { ProductShapeEntity } from '../../../entities/product';
import {
  IProductShapeRepository,
  PRODUCT_SHAPE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-shape-repository';

@Injectable()
export class UpdateProductShapeUseCase {
  constructor(
    @Inject(PRODUCT_SHAPE_REPOSITORY)
    private readonly repository: IProductShapeRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductShapeDto,
  ): Promise<ProductShapeEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductShapeEntity.fromUpdateProductShapeDto(existing, dto);
    const updated = await this.repository.update(id, entity);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
