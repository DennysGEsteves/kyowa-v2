import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type StockDocument = HydratedDocument<Stock>;

@Schema({
  collection: 'stock',
  timestamps: { createdAt: true, updatedAt: false },
})
export class Stock {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Product', index: true })
  productId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Store', index: true })
  storeId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User', index: true })
  userId!: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Seal' }],
    default: [],
  })
  sealIds!: Types.ObjectId[];

  @Prop({ required: true, type: Date })
  createdAt!: Date;
}

export const StockSchema = SchemaFactory.createForClass(Stock);

StockSchema.index({ storeId: 1, productId: 1, createdAt: -1 });
