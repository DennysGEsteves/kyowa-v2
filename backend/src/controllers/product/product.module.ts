import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import {
  CreateProductUseCase,
  GetProductsUseCase,
  UpdateProductUseCase,
} from 'src/usecases/product';
import { IProductRepository } from 'src/repositories/product/interfaces/i-product-repository';
import { ProductRepository } from 'src/repositories/product/product-repository';

@Module({
  providers: [
    ProductResolver,
    CreateProductUseCase,
    GetProductsUseCase,
    UpdateProductUseCase,
    { provide: IProductRepository, useClass: ProductRepository },
  ],
})
export class ProductModule {}
