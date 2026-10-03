import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductSizeDto } from '../../../controllers/product-size/dto/update-product-size.dto';
import { ProductSizeEntity } from '../../../entities/product';
import {
  IProductSizeRepository,
  PRODUCT_SIZE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-size-repository';

@Injectable()
export class UpdateProductSizeUseCase {
  constructor(
    @Inject(PRODUCT_SIZE_REPOSITORY)
    private readonly repository: IProductSizeRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductSizeDto,
  ): Promise<ProductSizeEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductSizeEntity.fromUpdateProductSizeDto(existing, dto);
    const updated = await this.repository.update(id, entity);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
