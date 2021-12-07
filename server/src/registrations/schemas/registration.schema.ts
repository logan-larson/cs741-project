import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistrationDocument = Registration & Document;

@Schema()
export class Registration {

  @Prop()
  registrationId: string;

  @Prop({ type: Date })
  timeStart: Date;

  @Prop({ type: Date })
  timeEnd: Date;

  @Prop()
  eventId: string;

}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);