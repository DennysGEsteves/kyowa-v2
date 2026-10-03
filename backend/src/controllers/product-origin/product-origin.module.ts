import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_ORIGIN_REPOSITORY } from '../../repositories/product/interfaces/i-product-origin-repository';
import { ProductOriginRepository } from '../../repositories/product/product-origin.repository';
import {
  ProductOrigin,
  ProductOriginSchema,
} from '../../repositories/product/schemas/product-origin.schema';
import { CreateProductOriginUseCase } from '../../usecases/product/origin/create-origin.usecase';
import { DeleteProductOriginUseCase } from '../../usecases/product/origin/delete-origin.usecase';
import { GetProductOriginByIdUseCase } from '../../usecases/product/origin/get-origin-by-id.usecase';
import { GetProductOriginsUseCase } from '../../usecases/product/origin/get-origins.usecase';
import { UpdateProductOriginUseCase } from '../../usecases/product/origin/update-origin.usecase';
import { ProductOriginController } from './product-origin.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductOrigin.name, schema: ProductOriginSchema },
    ]),
  ],
  controllers: [ProductOriginController],
  providers: [
    {
      provide: PRODUCT_ORIGIN_REPOSITORY,
      useClass: ProductOriginRepository,
    },
    CreateProductOriginUseCase,
    GetProductOriginsUseCase,
    GetProductOriginByIdUseCase,
    UpdateProductOriginUseCase,
    DeleteProductOriginUseCase,
  ],
})
export class ProductOriginModule {}
