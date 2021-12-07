import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DonationDocument = Donation & Document;

@Schema()
export class Donation {
  @Prop()
  donationId: string;

  @Prop()
  amount: number;

  @Prop()
  isRestricted: boolean;

  @Prop()
  eventId: string;

}

export const DonationSchema = SchemaFactory.createForClass(Donation);
