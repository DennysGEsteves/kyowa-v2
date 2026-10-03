import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_SIZE_REPOSITORY } from '../../repositories/product/interfaces/i-product-size-repository';
import { ProductSizeRepository } from '../../repositories/product/product-size.repository';
import {
  ProductSize,
  ProductSizeSchema,
} from '../../repositories/product/schemas/product-size.schema';
import { CreateProductSizeUseCase } from '../../usecases/product/size/create-size.usecase';
import { DeleteProductSizeUseCase } from '../../usecases/product/size/delete-size.usecase';
import { GetProductSizeByIdUseCase } from '../../usecases/product/size/get-size-by-id.usecase';
import { GetProductSizesUseCase } from '../../usecases/product/size/get-sizes.usecase';
import { UpdateProductSizeUseCase } from '../../usecases/product/size/update-size.usecase';
import { ProductSizeController } from './product-size.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductSize.name, schema: ProductSizeSchema },
    ]),
  ],
  controllers: [ProductSizeController],
  providers: [
    {
      provide: PRODUCT_SIZE_REPOSITORY,
      useClass: ProductSizeRepository,
    },
    CreateProductSizeUseCase,
    GetProductSizesUseCase,
    GetProductSizeByIdUseCase,
    UpdateProductSizeUseCase,
    DeleteProductSizeUseCase,
  ],
})
export class ProductSizeModule {}
