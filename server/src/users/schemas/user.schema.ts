import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  type: string;

  @Prop([String])
  activeRegistrationIds: string[];

  @Prop([String])
  inactiveRegistrationIds: string[];

  @Prop([String])
  donationIds: string[];

  @Prop()
  isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
