import { Body, Controller, Get, HttpException, Param, Post } from "@nestjs/common";
import { DonationsService } from "./donations.service";
import { MakeDonationDto } from "./dtos/make-donation.dto";
import { Donation } from "./schemas/donation.schema";

@Controller('api/donations')
export class DonationsController {

  constructor(private readonly donationsService: DonationsService) {}

  @Get('user/:userId/event/:eventId')
  async getUsersDonationsForEvent(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string
  ): Promise<Donation[]> {
    return this.donationsService.getUsersDonationsForEvent(userId, eventId);
  }

  @Post()
  async makeDonation(
    @Body() makeDonationDto: MakeDonationDto
  ): Promise<Donation> {
    if (Object.keys(makeDonationDto.event).length == 0) {
      // Handle as unrestricted donation
      return await this.donationsService.makeUnrestrictedDonation(
        makeDonationDto.amount,
        makeDonationDto.user,
      );
    } else {
      // Handle as restricted donation to event
      return await this.donationsService.makeDonationToEvent(
        makeDonationDto.amount,
        makeDonationDto.user,
        makeDonationDto.event
      );
    }
  }
}