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

  async getUsersDonationsForEvent(userId: string, eventId: string): Promise<Donation[]> {
    const user: User = await this.usersService.getUserById(userId);
    const event: Event = await this.eventsService.getEventById(eventId);

    const donationIds: string[] = [];
    for (const userDonId of user.donationIds) {
      for (const eventDonId of event.donationIds) {
        if (userDonId == eventDonId) {
          donationIds.push(userDonId);
        }
      }
    }

    return this.donationsRepository.findWithIdList(donationIds);
  }

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

  async makeUnrestrictedDonation(amount: number, user: User): Promise<Donation> {
    let donation: Donation = await this.donationsRepository.create({
      donationId: uuidv4(),
      amount: amount,
      isRestricted: false,
    });

    let userDonIds: string[] = user.donationIds;
    userDonIds.push(donation.donationId);
    if (!await this.usersService.updateDonationIds(user.userId, userDonIds)) {
      console.log("ERROR: DonationsService->makeDonationToEvent->updateUserDonIds");
      return null;
    }

    return donation;
  }
}