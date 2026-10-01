import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductCategoryDocument = HydratedDocument<ProductCategory>;

@Schema({ collection: 'products_category', timestamps: true })
export class ProductCategory {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductCategorySchema =
  SchemaFactory.createForClass(ProductCategory);
