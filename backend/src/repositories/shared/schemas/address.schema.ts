import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class AddressDocument {
  @Prop({ type: String, trim: true, maxlength: 10, default: null })
  cep!: string | null;

  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  street!: string | null;

  @Prop({ type: String, trim: true, maxlength: 20, default: null })
  number!: string | null;

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
}

export const AddressMongoSchema = SchemaFactory.createForClass(AddressDocument);
