import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  eventId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Date })
  timeStart: Date;

  @Prop({ type: Date })
  timeEnd: Date;
  
  @Prop()
  volunteersNeeded: number;
}

export const EventSchema = SchemaFactory.createForClass(Event);
