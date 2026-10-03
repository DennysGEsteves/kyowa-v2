import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_SHAPE_REPOSITORY } from '../../repositories/product/interfaces/i-product-shape-repository';
import { ProductShapeRepository } from '../../repositories/product/product-shape.repository';
import {
  ProductShape,
  ProductShapeSchema,
} from '../../repositories/product/schemas/product-shape.schema';
import { CreateProductShapeUseCase } from '../../usecases/product/shape/create-shape.usecase';
import { DeleteProductShapeUseCase } from '../../usecases/product/shape/delete-shape.usecase';
import { GetProductShapeByIdUseCase } from '../../usecases/product/shape/get-shape-by-id.usecase';
import { GetProductShapesUseCase } from '../../usecases/product/shape/get-shapes.usecase';
import { UpdateProductShapeUseCase } from '../../usecases/product/shape/update-shape.usecase';
import { ProductShapeController } from './product-shape.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductShape.name, schema: ProductShapeSchema },
    ]),
  ],
  controllers: [ProductShapeController],
  providers: [
    {
      provide: PRODUCT_SHAPE_REPOSITORY,
      useClass: ProductShapeRepository,
    },
    CreateProductShapeUseCase,
    GetProductShapesUseCase,
    GetProductShapeByIdUseCase,
    UpdateProductShapeUseCase,
    DeleteProductShapeUseCase,
  ],
})
export class ProductShapeModule {}
