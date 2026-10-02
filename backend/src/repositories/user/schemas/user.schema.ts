import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  USER_PERMISSIONS,
  UserPermission,
} from '../../../entities/user/types/user-permission';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    maxlength: 50,
  })
  email!: string;

  @Prop({ required: true, trim: true, maxlength: 50 })
  name!: string;

  @Prop({ required: true, trim: true, maxlength: 50, default: 'mudar123' })
  pass!: string;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  phone!: string | null;

  @Prop({ type: String, trim: true, maxlength: 50, default: null })
  login!: string | null;

  @Prop({
    type: String,
    required: true,
    enum: USER_PERMISSIONS,
  })
  permission!: UserPermission;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Store', index: true })
  storeId!: Types.ObjectId;

  @Prop({ required: true, default: true })
  active!: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
