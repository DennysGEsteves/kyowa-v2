import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductOriginDto } from '../../../controllers/product-origin/dto/update-product-origin.dto';
import { ProductOriginEntity } from '../../../entities/product';
import {
  IProductOriginRepository,
  PRODUCT_ORIGIN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-origin-repository';

@Injectable()
export class UpdateProductOriginUseCase {
  constructor(
    @Inject(PRODUCT_ORIGIN_REPOSITORY)
    private readonly repository: IProductOriginRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateProductOriginDto,
  ): Promise<ProductOriginEntity> {
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new NotFoundException('Registro não encontrado');
    }

    const entity = ProductOriginEntity.fromUpdateProductOriginDto(
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
