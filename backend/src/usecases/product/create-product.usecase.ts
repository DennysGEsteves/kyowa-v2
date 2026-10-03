import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../controllers/product/dto/create-product.dto';
import { ProductEntity } from '../../entities/product';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateProductDto): Promise<ProductEntity> {
    const product = ProductEntity.fromCreateProductDto(dto);
    return this.productRepository.create(product);
  }
}
