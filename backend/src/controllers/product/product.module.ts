import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategoryModule } from '../product-category/product-category.module';
import { ProviderModule } from '../provider/provider.module';
import { PRODUCT_REPOSITORY } from '../../repositories/product/interfaces/i-product-repository';
import { ProductRepository } from '../../repositories/product/product.repository';
import {
  Product,
  ProductSchema,
} from '../../repositories/product/schemas/product.schema';
import { CreateProductUseCase } from '../../usecases/product/create-product.usecase';
import { DeleteProductUseCase } from '../../usecases/product/delete-product.usecase';
import { GetProductByIdUseCase } from '../../usecases/product/get-product-by-id.usecase';
import { GetProductsUseCase } from '../../usecases/product/get-products.usecase';
import { ListProductsPaginatedUseCase } from '../../usecases/product/list-products-paginated.usecase';
import { ListUpdatePricesProductsUseCase } from '../../usecases/product/list-update-prices-products.usecase';
import { SearchProductsByNameUseCase } from '../../usecases/product/search-products-by-name.usecase';
import { UpdateProductUseCase } from '../../usecases/product/update-product.usecase';
import { ProductController } from './product.controller';
import { UpdateProductsPriceUseCase } from '../../usecases/product/update-product-price.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ProviderModule,
    ProductCategoryModule,
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    CreateProductUseCase,
    GetProductsUseCase,
    ListProductsPaginatedUseCase,
    ListUpdatePricesProductsUseCase,
    UpdateProductsPriceUseCase,
    SearchProductsByNameUseCase,
    GetProductByIdUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductModule {}
