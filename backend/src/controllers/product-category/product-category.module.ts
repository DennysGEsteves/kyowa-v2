import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_CATEGORY_REPOSITORY } from '../../repositories/product/interfaces/i-product-category-repository';
import { ProductCategoryRepository } from '../../repositories/product/product-category.repository';
import { ProductCategory, ProductCategorySchema } from '../../repositories/product/schemas/product-category.schema';
import { CreateProductCategoryUseCase } from '../../usecases/product/category/create-category.usecase';
import { DeleteProductCategoryUseCase } from '../../usecases/product/category/delete-category.usecase';
import { GetProductCategoryByIdUseCase } from '../../usecases/product/category/get-category-by-id.usecase';
import { GetProductCategoriesUseCase } from '../../usecases/product/category/get-categories.usecase';
import { UpdateProductCategoryUseCase } from '../../usecases/product/category/update-category.usecase';
import { ProductCategoryController } from './product-category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductCategory.name, schema: ProductCategorySchema },
    ]),
  ],
  controllers: [ProductCategoryController],
  providers: [
    {
      provide: PRODUCT_CATEGORY_REPOSITORY,
      useClass: ProductCategoryRepository,
    },
    CreateProductCategoryUseCase,
    GetProductCategoriesUseCase,
    GetProductCategoryByIdUseCase,
    UpdateProductCategoryUseCase,
    DeleteProductCategoryUseCase,
  ],
})
export class ProductCategoryModule {}
