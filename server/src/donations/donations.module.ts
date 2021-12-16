import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsModule } from "src/events/events.module";
import { UsersModule } from "src/users/users.module";
import { DonationsController } from "./donations.controller";
import { DonationsRepository } from "./donations.repository";
import { DonationsService } from "./donations.service";
import { Donation, DonationSchema } from "./schemas/donation.schema";

@Module({
  imports: [
    UsersModule,
    EventsModule,
    MongooseModule.forFeature([{ name: Donation.name, schema: DonationSchema}])
  ],
  controllers: [DonationsController],
  providers: [DonationsService, DonationsRepository]
})
export class DonationsModule {}