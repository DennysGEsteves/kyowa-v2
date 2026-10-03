import { Inject, Injectable } from '@nestjs/common';
import { CreateProductModelDto } from '../../../controllers/product-model/dto/create-product-model.dto';
import { ProductModelEntity } from '../../../entities/product';
import {
  IProductModelRepository,
  PRODUCT_MODEL_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-model-repository';

@Injectable()
export class CreateProductModelUseCase {
  constructor(
    @Inject(PRODUCT_MODEL_REPOSITORY)
    private readonly repository: IProductModelRepository,
  ) {}

  async execute(dto: CreateProductModelDto): Promise<ProductModelEntity> {
    const entity = ProductModelEntity.fromCreateProductModelDto(dto);
    return this.repository.create(entity);
  }
}
