import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProgramDocument = Program & Document;

@Schema()
export class Program {
  @Prop()
  programId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  dateStart: Date;

  @Prop({ type: Date })
  dateEnd: Date;

  @Prop([String])
  eventIds: string[];

  @Prop([String])
  donationIds: string[];
}

export const ProgramSchema = SchemaFactory.createForClass(Program);