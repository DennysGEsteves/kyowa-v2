import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductUnitModule } from './product-unit/product-unit.module';
import { ProductColorModule } from './product-color/product-color.module';
import { ProductSizeModule } from './product-size/product-size.module';
import { ProductDesignModule } from './product-design/product-design.module';
import { ProductShapeModule } from './product-shape/product-shape.module';
import { ProductOriginModule } from './product-origin/product-origin.module';
import { ProductModelModule } from './product-model/product-model.module';
import { ProductHeightModule } from './product-height/product-height.module';

@Module({
  imports: [
    ProductCategoryModule,
    ProductUnitModule,
    ProductColorModule,
    ProductSizeModule,
    ProductDesignModule,
    ProductShapeModule,
    ProductOriginModule,
    ProductModelModule,
    ProductHeightModule,
    ProductModule,
  ],
})
export class ProductsModule {}
