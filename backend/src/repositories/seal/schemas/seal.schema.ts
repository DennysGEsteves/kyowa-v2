import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import {
  SEAL_STATUSES,
  SealStatus,
} from '../../../entities/seal/types/seal-status';

@Schema({ _id: false })
export class SealHistoryEntryDocument {
  @Prop({ required: true, enum: SEAL_STATUSES, type: String })
  status!: SealStatus;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  data!: Record<string, unknown>;

  @Prop({ required: true, type: Date })
  createdAt!: Date;
}

export const SealHistoryEntrySchema = SchemaFactory.createForClass(
  SealHistoryEntryDocument,
);

export type SealDocument = HydratedDocument<Seal>;

@Schema({ collection: 'seals', timestamps: true })
export class Seal {
  @Prop({ required: true, type: Number, min: 1 })
  number!: number;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Store', index: true })
  storeId!: Types.ObjectId;

  @Prop({ required: true, enum: SEAL_STATUSES, type: String, index: true })
  status!: SealStatus;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Product', index: true })
  productId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, default: null, ref: 'Sale' })
  saleId!: Types.ObjectId | null;

  @Prop({ type: [SealHistoryEntrySchema], default: [] })
  history!: SealHistoryEntryDocument[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const SealSchema = SchemaFactory.createForClass(Seal);

SealSchema.index({ storeId: 1, number: 1 }, { unique: true });
