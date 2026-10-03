import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  CLIENT_ORIGINS,
  ClientOrigin,
} from '../../../entities/client/types/client-origin';
import {
  INTEREST_PRODUCTS,
  InterestProduct,
} from '../../../entities/client/types/interest-product';
import {
  AddressDocument,
  AddressMongoSchema,
} from '../../shared/schemas/address.schema';

export type ClientDocument = HydratedDocument<Client>;

@Schema({ collection: 'clients', timestamps: false })
export class Client {
  @Prop({ required: true, trim: true, maxlength: 255 })
  name!: string;

  @Prop({ required: true, trim: true, maxlength: 255, index: true })
  nameFilter!: string;

  @Prop({ type: String, trim: true, maxlength: 20, default: null })
  cpf!: string | null;

  @Prop({ type: String, trim: true, maxlength: 20, default: null })
  rg!: string | null;

  @Prop({ type: Types.ObjectId, default: null })
  architectId!: Types.ObjectId | null;

  @Prop({ type: Date, default: null })
  nasc!: Date | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  occupation!: string | null;

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

  @Prop({ required: true, default: true })
  active!: boolean;

  @Prop({
    type: [String],
    enum: INTEREST_PRODUCTS,
    default: null,
  })
  interestProducts!: InterestProduct[] | null;

  @Prop({
    type: [String],
    enum: CLIENT_ORIGINS,
    default: null,
  })
  origins!: ClientOrigin[] | null;

  @Prop({ required: true })
  entry!: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
