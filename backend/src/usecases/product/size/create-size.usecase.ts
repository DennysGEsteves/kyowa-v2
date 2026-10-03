import { Inject, Injectable } from '@nestjs/common';
import { CreateProductSizeDto } from '../../../controllers/product-size/dto/create-product-size.dto';
import { ProductSizeEntity } from '../../../entities/product';
import {
  IProductSizeRepository,
  PRODUCT_SIZE_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-size-repository';

@Injectable()
export class CreateProductSizeUseCase {
  constructor(
    @Inject(PRODUCT_SIZE_REPOSITORY)
    private readonly repository: IProductSizeRepository,
  ) {}

  async execute(dto: CreateProductSizeDto): Promise<ProductSizeEntity> {
    const entity = ProductSizeEntity.fromCreateProductSizeDto(dto);
    return this.repository.create(entity);
  }
}
