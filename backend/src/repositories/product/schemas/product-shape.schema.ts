import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductShapeDocument = HydratedDocument<ProductShape>;

@Schema({ collection: 'products_shape', timestamps: true })
export class ProductShape {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductShapeSchema = SchemaFactory.createForClass(ProductShape);
