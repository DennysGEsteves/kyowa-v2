import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductHeightDto } from '../../../controllers/product-height/dto/update-product-height.dto';
import { ProductHeightEntity } from '../../../entities/product';
import {
  IProductHeightRepository,
  PRODUCT_HEIGHT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-height-repository';

@Injectable()
export class UpdateProductHeightUseCase {
  constructor(
    @Inject(PRODUCT_HEIGHT_REPOSITORY)
    private readonly repository: IProductHeightRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductHeightDto,
  ): Promise<ProductHeightEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductHeightEntity.fromUpdateProductHeightDto(
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
