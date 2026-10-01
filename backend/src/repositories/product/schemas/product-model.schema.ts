import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductModelDocument = HydratedDocument<ProductModel>;

@Schema({ collection: 'products_model', timestamps: true })
export class ProductModel {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductModelSchema = SchemaFactory.createForClass(ProductModel);
