import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ArchitectDocument = HydratedDocument<Architect>;

@Schema({ collection: 'architects', timestamps: false })
export class Architect {
  @Prop({ required: true, trim: true, maxlength: 255 })
  name!: string;

  @Prop({ required: true, trim: true, maxlength: 255, index: true })
  nameFilter!: string;

  @Prop({ type: String, trim: true, maxlength: 20, default: null })
  cpf!: string | null;

  @Prop({ type: Date, default: null })
  nasc!: Date | null;

  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    maxlength: 50,
    default: null,
  })
  email!: string | null;

  @Prop({ type: String, trim: true, maxlength: 10, default: null })
  cep!: string | null;

  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  address!: string | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  district!: string | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  city!: string | null;

  @Prop({
    type: String,
    trim: true,
    uppercase: true,
    maxlength: 2,
    default: null,
  })
  region!: string | null;

  @Prop({ type: String, trim: true, maxlength: 15, default: null })
  phone1!: string | null;

  @Prop({ type: String, trim: true, maxlength: 15, default: null })
  phone2!: string | null;

  @Prop({ type: String, default: null })
  obs!: string | null;

  @Prop({ required: true, default: true })
  active!: boolean;

  @Prop({ type: Types.ObjectId, required: true, ref: 'User', index: true })
  sellerId!: Types.ObjectId;
}

export const ArchitectSchema = SchemaFactory.createForClass(Architect);
