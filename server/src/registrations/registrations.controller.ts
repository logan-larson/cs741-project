import { Body, Controller, HttpCode, HttpException, Param, Post } from "@nestjs/common";
import { CreateRegistrationDto } from "./dtos/create-registration.dto";
import { RemoveRegistrationDto } from "./dtos/remove-registration.dto";
import { RegistrationsService } from "./registrations.service";
import { Registration } from "./schemas/registration.schema";




@Controller('api/registrations')
export class RegistrationsController {

  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post(':registrationId')
  async unregisterFromEvent(
    @Param('registrationId') registrationId: string,
    @Body() removeRegistrationDto: RemoveRegistrationDto
  ): Promise<Registration> {
    return this.registrationsService.removeRegistration(
      registrationId,
      removeRegistrationDto.user,
      removeRegistrationDto.event);
  }
  
  @Post()
  async registerForEvent(
    @Body() createRegistrationDto: CreateRegistrationDto
  ): Promise<Registration> {
    let isOverlapping = await this.registrationsService.checkOverlap(createRegistrationDto.user, createRegistrationDto.event);
    if (isOverlapping) {
      throw new HttpException("Overlap", 400);
    }

    return await this.registrationsService.createRegistration(createRegistrationDto.user, createRegistrationDto.event);
  }
}