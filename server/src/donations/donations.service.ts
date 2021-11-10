import { Injectable } from "@nestjs/common";
import { Event } from "src/events/schemas/event.schema";
import { User } from "src/users/schemas/user.schema";
import { Donation } from "./schemas/donation.schema";
import { v4 as uuidv4 } from "uuid";
import { DonationsRepository } from "./donations.repository";
import { UsersService } from "src/users/users.service";
import { EventsService } from "src/events/events.service";
import { ProgramsService } from "src/programs/programs.service";

@Injectable()
export class DonationsService {

  constructor(
    private readonly donationsRepository: DonationsRepository,
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
    private readonly programsService: ProgramsService
  ) {}

  async makeDonationToEvent(amount: number, user: User, event: Event): Promise<Donation> {
    let donation: Donation = await this.donationsRepository.create({
      donationId: uuidv4(),
      amount: amount,
      isRestricted: true,
    });

    let userDonIds: string[] = user.donationIds;
    userDonIds.push(donation.donationId);
    if (!await this.usersService.updateDonationIds(user.userId, userDonIds)) {
      console.log("ERROR: DonationsService->makeDonationToEvent->updateUserDonIds");
      return null;
    }

    let eventDonIds: string[] = event.donationIds;
    eventDonIds.push(donation.donationId);
    if (!await this.eventsService.updateDonationIds(event.eventId, eventDonIds)) {
      console.log("ERROR: DonationsService->makeDonationToEvent->updateEventDonIds");
      return null;
    }

    return donation;
  }
}