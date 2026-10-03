import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  AddressDocument,
  AddressMongoSchema,
} from '../../shared/schemas/address.schema';

export type StoreDocument = HydratedDocument<Store>;

@Schema({ collection: 'stores', timestamps: false })
export class Store {
  @Prop({ required: true, trim: true, maxlength: 255 })
  name!: string;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 50,
    default: null,
  })
  email!: string | null;

  @Prop({ type: AddressMongoSchema, default: null })
  address!: AddressDocument | null;

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
