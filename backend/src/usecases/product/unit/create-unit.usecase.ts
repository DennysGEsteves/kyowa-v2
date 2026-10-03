import { Inject, Injectable } from '@nestjs/common';
import { CreateProductUnitDto } from '../../../controllers/product-unit/dto/create-product-unit.dto';
import { ProductUnitEntity } from '../../../entities/product';
import {
  IProductUnitRepository,
  PRODUCT_UNIT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-unit-repository';

@Injectable()
export class CreateProductUnitUseCase {
  constructor(
    @Inject(PRODUCT_UNIT_REPOSITORY)
    private readonly repository: IProductUnitRepository,
  ) {}

  async execute(dto: CreateProductUnitDto): Promise<ProductUnitEntity> {
    const entity = ProductUnitEntity.fromCreateProductUnitDto(dto);
    return this.repository.create(entity);
  }
}
