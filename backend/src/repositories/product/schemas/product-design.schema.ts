import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDesignDocument = HydratedDocument<ProductDesign>;

@Schema({ collection: 'products_design', timestamps: true })
export class ProductDesign {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductDesignSchema = SchemaFactory.createForClass(ProductDesign);
