import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductSizeDocument = HydratedDocument<ProductSize>;

@Schema({ collection: 'products_size', timestamps: true })
export class ProductSize {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductSizeSchema = SchemaFactory.createForClass(ProductSize);
