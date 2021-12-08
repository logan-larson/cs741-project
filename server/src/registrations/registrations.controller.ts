import { Body, Controller, Get, HttpCode, HttpException, Param, Post } from "@nestjs/common";
import { CreateRegistrationDto } from "./dtos/create-registration.dto";
import { ChangeActivationRegistrationDto } from "./dtos/change-activation-registration.dto";
import { RegistrationsService } from "./registrations.service";
import { Registration } from "./schemas/registration.schema";


@Controller('api/registrations')
export class RegistrationsController {

  constructor(private readonly registrationsService: RegistrationsService) {}

  @Get(':eventId')
  async getEventRegistrations(
    @Param('eventId') eventId: string
  ): Promise<Registration[]> {
    return await this.registrationsService.getEventRegistrations(eventId);
  }

  @Get('user/:userId/active')
  async getUserActiveRegistrations(
    @Param('userId') userId: string
  ): Promise<Registration[]> {
    return await this.registrationsService.getUserActiveRegistrations(userId);
  }

  @Get('user/:userId/inactive')
  async getUserInctiveRegistrations(
    @Param('userId') userId: string
  ): Promise<Registration[]> {
    return await this.registrationsService.getUserInactiveRegistrations(userId);
  }

  @Get('user/:userId')
  async getVolunteerTime(
    @Param('userId') userId: string
  ): Promise<number> {
    return await this.registrationsService.getVolunteerTime(userId);
  }

  @Post(':registrationId/deactivate')
  async deactivateRegistration(
    @Param('registrationId') registrationId: string,
    @Body() changeActivationRegistrationDto: ChangeActivationRegistrationDto
  ): Promise<Registration> {
    console.log("Received request");

    return this.registrationsService.deactivateRegistration(
      registrationId,
      changeActivationRegistrationDto.user,
      changeActivationRegistrationDto.event);
  }

  @Post(':registrationId/activate')
  async activateRegistration(
    @Param('registrationId') registrationId: string,
    @Body() changeActivationRegistrationDto: ChangeActivationRegistrationDto
  ): Promise<Registration> {

    let isOverlapping = await this.registrationsService.checkOverlap(
      changeActivationRegistrationDto.user,
      changeActivationRegistrationDto.event
    );
    if (isOverlapping) {
      throw new HttpException("Overlap", 400);
    }

    let isAvailable = await this.registrationsService.checkAvailability(
      changeActivationRegistrationDto.event
    );
    if (!isAvailable) {
      throw new HttpException("Not available", 400);
    }

    return this.registrationsService.activateRegistration(
      registrationId,
      changeActivationRegistrationDto.user,
      changeActivationRegistrationDto.event);
  }

  @Post()
  async createRegistration(
    @Body() createRegistrationDto: CreateRegistrationDto
  ): Promise<Registration> {

    let isOverlapping = await this.registrationsService.checkOverlap(createRegistrationDto.user, createRegistrationDto.event);
    if (isOverlapping) {
      throw new HttpException("Overlap", 400);
    }

    let isAvailable = await this.registrationsService.checkAvailability(
      createRegistrationDto.event
    );
    if (!isAvailable) {
      throw new HttpException("Not available", 400);
    }

    return await this.registrationsService.createRegistration(
      createRegistrationDto.user, 
      createRegistrationDto.event
    );
  }
}