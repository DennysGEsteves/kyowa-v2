import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductModelDto } from '../../../controllers/product-model/dto/update-product-model.dto';
import { ProductModelEntity } from '../../../entities/product';
import {
  IProductModelRepository,
  PRODUCT_MODEL_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-model-repository';

@Injectable()
export class UpdateProductModelUseCase {
  constructor(
    @Inject(PRODUCT_MODEL_REPOSITORY)
    private readonly repository: IProductModelRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductModelDto,
  ): Promise<ProductModelEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductModelEntity.fromUpdateProductModelDto(existing, dto);
    const updated = await this.repository.update(id, entity);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
