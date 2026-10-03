import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_COLOR_REPOSITORY } from '../../repositories/product/interfaces/i-product-color-repository';
import { ProductColorRepository } from '../../repositories/product/product-color.repository';
import {
  ProductColor,
  ProductColorSchema,
} from '../../repositories/product/schemas/product-color.schema';
import { CreateProductColorUseCase } from '../../usecases/product/color/create-color.usecase';
import { DeleteProductColorUseCase } from '../../usecases/product/color/delete-color.usecase';
import { GetProductColorByIdUseCase } from '../../usecases/product/color/get-color-by-id.usecase';
import { GetProductColorsUseCase } from '../../usecases/product/color/get-colors.usecase';
import { UpdateProductColorUseCase } from '../../usecases/product/color/update-color.usecase';
import { ProductColorController } from './product-color.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductColor.name, schema: ProductColorSchema },
    ]),
  ],
  controllers: [ProductColorController],
  providers: [
    {
      provide: PRODUCT_COLOR_REPOSITORY,
      useClass: ProductColorRepository,
    },
    CreateProductColorUseCase,
    GetProductColorsUseCase,
    GetProductColorByIdUseCase,
    UpdateProductColorUseCase,
    DeleteProductColorUseCase,
  ],
})
export class ProductColorModule {}
