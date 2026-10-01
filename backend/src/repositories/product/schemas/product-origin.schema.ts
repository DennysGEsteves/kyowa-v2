import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductOriginDocument = HydratedDocument<ProductOrigin>;

@Schema({ collection: 'products_origin', timestamps: true })
export class ProductOrigin {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductOriginSchema = SchemaFactory.createForClass(ProductOrigin);
