import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import {
  BUDGET_CLOSING_AT_VALUES,
  BudgetClosingAt,
} from '../../../entities/budget/types/budget-closing-at';
import {
  BUDGET_CLOSING_LEVELS,
  BudgetClosingLevel,
} from '../../../entities/budget/types/budget-closing-level';
import {
  BUDGET_STATUSES,
  BudgetStatus,
} from '../../../entities/budget/types/budget-status';

@Schema({ _id: false })
export class BudgetCheckoutEntryDocument {
  @Prop({ required: true, type: Number, min: 0 })
  quantity!: number;

  @Prop({ type: Types.ObjectId, required: true, ref: 'ProductCategory' })
  categoryId!: Types.ObjectId;

  @Prop({ required: true, type: Number, min: 0 })
  price!: number;

  @Prop({ required: true, type: String, trim: true })
  description!: string;
}

export const BudgetCheckoutEntrySchema = SchemaFactory.createForClass(
  BudgetCheckoutEntryDocument,
);

@Schema({ _id: false })
export class BudgetHistoryEntryDocument {
  @Prop({ type: Types.ObjectId, required: true, ref: 'User' })
  userId!: Types.ObjectId;

  @Prop({ required: true, type: Date })
  createdAt!: Date;

  @Prop({ type: MongooseSchema.Types.Mixed, default: {} })
  data!: Record<string, unknown>;
}

export const BudgetHistoryEntrySchema = SchemaFactory.createForClass(
  BudgetHistoryEntryDocument,
);

export type BudgetDocument = HydratedDocument<Budget>;

@Schema({
  collection: 'budgets',
  timestamps: { createdAt: true, updatedAt: false },
})
export class Budget {
  @Prop({ type: Types.ObjectId, default: null, ref: 'Client', index: true })
  clientId!: Types.ObjectId | null;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User', index: true })
  userId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Store', index: true })
  storeId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, default: null, ref: 'Architect', index: true })
  architectId!: Types.ObjectId | null;

  @Prop({ type: String, default: null })
  obs!: string | null;

  @Prop({ type: String, trim: true, maxlength: 100, default: null })
  lostReasons!: string | null;

  @Prop({ type: Number, default: null, min: 0 })
  total!: number | null;

  @Prop({
    required: true,
    enum: BUDGET_STATUSES,
    type: String,
    default: BudgetStatus.Open,
    index: true,
  })
  status!: BudgetStatus;

  @Prop({
    type: String,
    enum: BUDGET_CLOSING_AT_VALUES,
    default: null,
  })
  closingAt!: BudgetClosingAt | null;

  @Prop({
    type: String,
    enum: BUDGET_CLOSING_LEVELS,
    default: null,
  })
  closingLevel!: BudgetClosingLevel | null;

  @Prop({ type: [BudgetCheckoutEntrySchema], default: [] })
  checkout!: BudgetCheckoutEntryDocument[];

  @Prop({ type: [BudgetHistoryEntrySchema], default: [] })
  history!: BudgetHistoryEntryDocument[];

  @Prop({ required: true, type: Date })
  createdAt!: Date;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);

BudgetSchema.index({ storeId: 1, createdAt: -1 });
BudgetSchema.index({ clientId: 1, createdAt: -1 });
BudgetSchema.index({ status: 1, createdAt: -1 });
