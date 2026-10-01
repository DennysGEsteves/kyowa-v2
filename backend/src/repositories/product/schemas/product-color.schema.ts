import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductColorDocument = HydratedDocument<ProductColor>;

@Schema({ collection: 'products_color', timestamps: true })
export class ProductColor {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductColorSchema = SchemaFactory.createForClass(ProductColor);
