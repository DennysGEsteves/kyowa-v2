import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductColorDto } from '../../../controllers/product-color/dto/update-product-color.dto';
import { ProductColorEntity } from '../../../entities/product';
import {
  IProductColorRepository,
  PRODUCT_COLOR_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-color-repository';

@Injectable()
export class UpdateProductColorUseCase {
  constructor(
    @Inject(PRODUCT_COLOR_REPOSITORY)
    private readonly repository: IProductColorRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductColorDto,
  ): Promise<ProductColorEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductColorEntity.fromUpdateProductColorDto(existing, dto);
    const updated = await this.repository.update(id, entity);
    if (!updated) {
      throw new NotFoundException('Registro não encontrado');
    }
    return updated;
  }
}
