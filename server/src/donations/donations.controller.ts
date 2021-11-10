import { Body, Controller, HttpException, Post } from "@nestjs/common";
import { DonationsService } from "./donations.service";
import { MakeDonationDto } from "./dtos/make-donation.dto";
import { Donation } from "./schemas/donation.schema";

@Controller('api/donations')
export class DonationsController {

  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  async makeDonation(
    @Body() makeDonationDto: MakeDonationDto
  ): Promise<Donation> {
    if (!makeDonationDto.event || !makeDonationDto.program) {
      console.log("Handle unrestricted donation");
      // Handle as unrestricted donation
    } else if (makeDonationDto.event) {
      console.log("Handle event donation");
      // Handle as restricted donation to event
      return await this.donationsService.makeDonationToEvent(
        makeDonationDto.amount,
        makeDonationDto.user,
        makeDonationDto.event
      );
    } else if (makeDonationDto.program) {
      console.log("Handle program donation");
      // Handle as restricted donation to program
    }

    throw new HttpException("Somehow got here", 400);
  }
}