import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PRODUCT_DESIGN_REPOSITORY } from '../../repositories/product/interfaces/i-product-design-repository';
import { ProductDesignRepository } from '../../repositories/product/product-design.repository';
import { ProductDesign, ProductDesignSchema } from '../../repositories/product/schemas/product-design.schema';
import { CreateProductDesignUseCase } from '../../usecases/product/design/create-design.usecase';
import { DeleteProductDesignUseCase } from '../../usecases/product/design/delete-design.usecase';
import { GetProductDesignByIdUseCase } from '../../usecases/product/design/get-design-by-id.usecase';
import { GetProductDesignsUseCase } from '../../usecases/product/design/get-designs.usecase';
import { UpdateProductDesignUseCase } from '../../usecases/product/design/update-design.usecase';
import { ProductDesignController } from './product-design.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductDesign.name, schema: ProductDesignSchema },
    ]),
  ],
  controllers: [ProductDesignController],
  providers: [
    {
      provide: PRODUCT_DESIGN_REPOSITORY,
      useClass: ProductDesignRepository,
    },
    CreateProductDesignUseCase,
    GetProductDesignsUseCase,
    GetProductDesignByIdUseCase,
    UpdateProductDesignUseCase,
    DeleteProductDesignUseCase,
  ],
})
export class ProductDesignModule {}
