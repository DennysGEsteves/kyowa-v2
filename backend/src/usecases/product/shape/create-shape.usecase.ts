import { Inject, Injectable } from '@nestjs/common';
import { CreateProductShapeDto } from '../../../controllers/product-shape/dto/create-product-shape.dto';
import { ProductShapeEntity } from '../../../entities/product';
import {
  IProductShapeRepository,
  PRODUCT_SHAPE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-shape-repository';

@Injectable()
export class CreateProductShapeUseCase {
  constructor(
    @Inject(PRODUCT_SHAPE_REPOSITORY)
    private readonly repository: IProductShapeRepository,
  ) {}

  async execute(dto: CreateProductShapeDto): Promise<ProductShapeEntity> {
    const entity = ProductShapeEntity.fromCreateProductShapeDto(dto);
    return this.repository.create(entity);
  }
}
