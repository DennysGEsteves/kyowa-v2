import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_MODEL_REPOSITORY } from '../../repositories/product/interfaces/i-product-model-repository';
import { ProductModelRepository } from '../../repositories/product/product-model.repository';
import { ProductModel, ProductModelSchema } from '../../repositories/product/schemas/product-model.schema';
import { CreateProductModelUseCase } from '../../usecases/product/model/create-model.usecase';
import { DeleteProductModelUseCase } from '../../usecases/product/model/delete-model.usecase';
import { GetProductModelByIdUseCase } from '../../usecases/product/model/get-model-by-id.usecase';
import { GetProductModelsUseCase } from '../../usecases/product/model/get-models.usecase';
import { UpdateProductModelUseCase } from '../../usecases/product/model/update-model.usecase';
import { ProductModelController } from './product-model.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductModelSchema },
    ]),
  ],
  controllers: [ProductModelController],
  providers: [
    {
      provide: PRODUCT_MODEL_REPOSITORY,
      useClass: ProductModelRepository,
    },
    CreateProductModelUseCase,
    GetProductModelsUseCase,
    GetProductModelByIdUseCase,
    UpdateProductModelUseCase,
    DeleteProductModelUseCase,
  ],
})
export class ProductModelModule {}
