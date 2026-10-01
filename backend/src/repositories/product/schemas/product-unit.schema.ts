import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductUnitDocument = HydratedDocument<ProductUnit>;

@Schema({ collection: 'products_unit', timestamps: true })
export class ProductUnit {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductUnitSchema = SchemaFactory.createForClass(ProductUnit);
