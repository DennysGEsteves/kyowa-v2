import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'products', timestamps: true })
export class Product {
  @Prop({ required: true, trim: true, maxlength: 100 })
  name!: string;

  @Prop({ required: true, trim: true, maxlength: 100 })
  fantasyName!: string;

  @Prop({ required: true, trim: true, maxlength: 100, index: true })
  nameFilter!: string;

  @Prop({ type: Number, default: null, min: 0 })
  ezId!: number | null;

  @Prop({ type: Types.ObjectId, default: null })
  providerId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, default: null })
  categoryId!: Types.ObjectId | null;

  @Prop({ type: String, trim: true, maxlength: 20, default: null })
  ref!: string | null;

  @Prop({ type: Types.ObjectId, default: null })
  unitId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, default: null })
  colorId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, default: null })
  sizeId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, default: null })
  designId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, default: null })
  shapeId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, default: null })
  originId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, default: null })
  modelId!: Types.ObjectId | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  ncm!: string | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  cst!: string | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  ean!: string | null;

  @Prop({ type: Number, default: null, min: 0 })
  buyPrice!: number | null;

  @Prop({ type: Number, default: null, min: 0 })
  sellPrice!: number | null;

  @Prop({ type: Boolean, default: null })
  hasSeals!: boolean | null;

  @Prop({ type: Number, default: null, min: 0, max: 99999 })
  amountStart!: number | null;

  @Prop({ type: Number, default: null, min: 0, max: 99999 })
  amountSold!: number | null;

  @Prop({ required: true, default: false })
  amountUnlimited!: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
