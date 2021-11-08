import { Body, Controller, HttpCode, HttpException, Post } from "@nestjs/common";
import { createRegistrationDto } from "./dtos/create-registration.dto";
import { RegistrationsService } from "./registrations.service";
import { Registration } from "./schemas/registration.schema";




@Controller('api/registrations')
export class RegistrationsController {

  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  async registerForEvent(
    @Body() createRegistrationDto: createRegistrationDto
  ): Promise<Registration> {
    let isOverlapping = await this.registrationsService.checkOverlap(createRegistrationDto.user, createRegistrationDto.event);
    if (isOverlapping) {
      console.log("overlapped");
      
      throw new HttpException("Overlap", 400);
    }

    console.log("not overlapped");

    return this.registrationsService.createRegistration(createRegistrationDto.user, createRegistrationDto.event);
  }

}