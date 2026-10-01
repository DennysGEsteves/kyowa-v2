import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_UNIT_REPOSITORY } from '../../repositories/product/interfaces/i-product-unit-repository';
import { ProductUnitRepository } from '../../repositories/product/product-unit.repository';
import { ProductUnit, ProductUnitSchema } from '../../repositories/product/schemas/product-unit.schema';
import { CreateProductUnitUseCase } from '../../usecases/product/unit/create-unit.usecase';
import { DeleteProductUnitUseCase } from '../../usecases/product/unit/delete-unit.usecase';
import { GetProductUnitByIdUseCase } from '../../usecases/product/unit/get-unit-by-id.usecase';
import { GetProductUnitsUseCase } from '../../usecases/product/unit/get-units.usecase';
import { UpdateProductUnitUseCase } from '../../usecases/product/unit/update-unit.usecase';
import { ProductUnitController } from './product-unit.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductUnit.name, schema: ProductUnitSchema },
    ]),
  ],
  controllers: [ProductUnitController],
  providers: [
    {
      provide: PRODUCT_UNIT_REPOSITORY,
      useClass: ProductUnitRepository,
    },
    CreateProductUnitUseCase,
    GetProductUnitsUseCase,
    GetProductUnitByIdUseCase,
    UpdateProductUnitUseCase,
    DeleteProductUnitUseCase,
  ],
})
export class ProductUnitModule {}
