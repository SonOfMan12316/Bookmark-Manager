import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true, trim: true })
  fullName: string;

  @Prop({type: String, required: true, unique: true})
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  emailVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

