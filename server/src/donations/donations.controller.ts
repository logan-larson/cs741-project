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

  @Get('user/:userId')
  async getUsersDonations(
    @Param('userId') userId: string,
  ): Promise<Donation[]> {
    return this.donationsService.getUsersDonations(userId);
  }

  @Post()
  async makeDonation(
    @Body() makeDonationDto: MakeDonationDto
  ): Promise<Donation> {
    return await this.donationsService.makeDonationToEvent(
      makeDonationDto.amount,
      makeDonationDto.user,
      makeDonationDto.event
    );
  }

  @Post("unrestricted")
  async makeUnrestrictedDonation(
    @Body() makeDonationDto: MakeDonationDto
  ): Promise<Donation> {
    return await this.donationsService.makeUnrestrictedDonation(
      makeDonationDto.amount,
      makeDonationDto.user,
    );
  }
}