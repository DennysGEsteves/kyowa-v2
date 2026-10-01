import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  PROVIDER_TYPES,
  ProviderType,
} from '../../../entities/provider/types/provider-type';

export type ProviderDocument = HydratedDocument<Provider>;

@Schema({ collection: 'providers', timestamps: true })
export class Provider {
  @Prop({ required: true, trim: true, maxlength: 255 })
  name!: string;

  @Prop({ required: true, trim: true, maxlength: 100, index: true })
  nameFilter!: string;

  @Prop({ type: String, trim: true, maxlength: 20, default: null })
  cnpj!: string | null;

  @Prop({ type: String, trim: true, maxlength: 20, default: null })
  im!: string | null;

  @Prop({ type: String, trim: true, maxlength: 20, default: null })
  ie!: string | null;

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

  @Prop({ type: String, enum: PROVIDER_TYPES, default: null })
  type!: ProviderType | null;

  @Prop({ required: true, default: true })
  active!: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProviderSchema = SchemaFactory.createForClass(Provider);
