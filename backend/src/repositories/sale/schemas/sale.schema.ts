import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  SALE_PAYMENT_METHODS,
  SalePaymentMethod,
} from '../../../entities/sale/types/sale-payment-method';
import { SALE_TYPES, SaleType } from '../../../entities/sale/types/sale-type';

@Schema({ _id: false })
export class SaleCheckoutEntryDocument {
  @Prop({ required: true, type: Boolean })
  hasSeal!: boolean;

  @Prop({ type: Number, default: null, min: 1 })
  sealId!: number | null;

  @Prop({ type: Number, default: null, min: 0 })
  value!: number | null;

  @Prop({ type: Types.ObjectId, default: null, ref: 'Product' })
  productId!: Types.ObjectId | null;

  @Prop({ type: Number, default: null, min: 0 })
  quantity!: number | null;

  @Prop({ type: String, default: null })
  description!: string | null;

  @Prop({ type: Types.ObjectId, default: null })
  orderId!: Types.ObjectId | null;
}

export const SaleCheckoutEntrySchema = SchemaFactory.createForClass(
  SaleCheckoutEntryDocument,
);

export type SaleDocument = HydratedDocument<Sale>;

@Schema({
  collection: 'sales',
  timestamps: { createdAt: true, updatedAt: false },
})
export class Sale {
  @Prop({ type: Number, unique: true, sparse: true, index: true })
  sequentialId!: number | null;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Client', index: true })
  clientId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User', index: true })
  sellerId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Store', index: true })
  storeId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, default: null, ref: 'Architect', index: true })
  architectId!: Types.ObjectId | null;

  @Prop({ required: true, type: Boolean, default: false })
  architectParticipation!: boolean;

  @Prop({ type: String, default: null })
  obsReceipt!: string | null;

  @Prop({ type: String, default: null })
  obsInternal!: string | null;

  @Prop({ required: true, enum: SALE_TYPES, type: String, index: true })
  type!: SaleType;

  @Prop({ type: Number, default: null, min: 0 })
  changeCredit!: number | null;

  @Prop({ type: Number, default: null, min: 1 })
  plots!: number | null;

  @Prop({ type: String, enum: SALE_PAYMENT_METHODS, default: null })
  paymentMethod!: SalePaymentMethod | null;

  @Prop({ type: Date, default: null })
  paidAt!: Date | null;

  @Prop({ type: [SaleCheckoutEntrySchema], default: [] })
  checkout!: SaleCheckoutEntryDocument[];

  @Prop({ required: true, type: Date })
  createdAt!: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

SaleSchema.index({ storeId: 1, createdAt: -1 });
SaleSchema.index({ clientId: 1, createdAt: -1 });
SaleSchema.index({ sellerId: 1, createdAt: -1 });
SaleSchema.index({ paidAt: 1, createdAt: -1 });
SaleSchema.index({ type: 1, createdAt: -1 });
