import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductHeightDocument = HydratedDocument<ProductHeight>;

@Schema({ collection: 'products_height', timestamps: true })
export class ProductHeight {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductHeightSchema = SchemaFactory.createForClass(ProductHeight);
