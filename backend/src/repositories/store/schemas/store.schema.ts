import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type StoreDocument = HydratedDocument<Store>;

@Schema({ collection: 'stores', timestamps: false })
export class Store {
  @Prop({ required: true, trim: true, maxlength: 255 })
  name!: string;

  @Prop({ type: String, trim: true, lowercase: true, maxlength: 50, default: null })
  email!: string | null;

  @Prop({ type: String, trim: true, maxlength: 10, default: null })
  cep!: string | null;

  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  address!: string | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  district!: string | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  city!: string | null;

  @Prop({ type: String, trim: true, uppercase: true, maxlength: 2, default: null })
  region!: string | null;

  @Prop({ type: String, trim: true, maxlength: 15, default: null })
  phone1!: string | null;

  @Prop({ type: String, trim: true, maxlength: 15, default: null })
  phone2!: string | null;

  @Prop({ type: String, default: null })
  obs!: string | null;

  @Prop({ type: Types.ObjectId, default: null, ref: 'User', index: true })
  managerId!: Types.ObjectId | null;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
