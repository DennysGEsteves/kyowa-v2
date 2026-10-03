import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_HEIGHT_REPOSITORY } from '../../repositories/product/interfaces/i-product-height-repository';
import { ProductHeightRepository } from '../../repositories/product/product-height.repository';
import {
  ProductHeight,
  ProductHeightSchema,
} from '../../repositories/product/schemas/product-height.schema';
import { CreateProductHeightUseCase } from '../../usecases/product/height/create-height.usecase';
import { DeleteProductHeightUseCase } from '../../usecases/product/height/delete-height.usecase';
import { GetProductHeightByIdUseCase } from '../../usecases/product/height/get-height-by-id.usecase';
import { GetProductHeightsUseCase } from '../../usecases/product/height/get-heights.usecase';
import { UpdateProductHeightUseCase } from '../../usecases/product/height/update-height.usecase';
import { ProductHeightController } from './product-height.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductHeight.name, schema: ProductHeightSchema },
    ]),
  ],
  controllers: [ProductHeightController],
  providers: [
    {
      provide: PRODUCT_HEIGHT_REPOSITORY,
      useClass: ProductHeightRepository,
    },
    CreateProductHeightUseCase,
    GetProductHeightsUseCase,
    GetProductHeightByIdUseCase,
    UpdateProductHeightUseCase,
    DeleteProductHeightUseCase,
  ],
})
export class ProductHeightModule {}
