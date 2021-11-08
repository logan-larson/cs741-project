import { Injectable } from "@nestjs/common";
import { Event } from "src/events/schemas/event.schema";
import { User } from "src/users/schemas/user.schema";
import { RegistrationsRepository } from "./registrations.repository";
import { Registration } from "./schemas/registration.schema";
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from "src/users/users.service";
import { EventsService } from "src/events/events.service";


@Injectable()
export class RegistrationsService {

  constructor(private readonly registrationsRepository: RegistrationsRepository,
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService) {}

  async checkOverlap(user: User, event: Event): Promise<boolean> {
    
    console.log(`Event -- Start: ${event.timeStart}, End: ${event.timeEnd}`);

    if (user.registrationIds.length == 0) {
      return false;
    }

    // For each registration id in user's reg ids
    for (const index in user.registrationIds) {
      // Get registration object
      let registration: Registration = await this.registrationsRepository.findOne({ registrationId: user.registrationIds[index] })

      // Check if times overlap with event times
      console.log(`Registration -- Start: ${registration.timeStart}, End: ${registration.timeEnd}`);
      
      // -- check if event start time or end time is within the registration time
    }

    return true;
  }

  async createRegistration(user: User, event: Event): Promise<Registration> {
    let registration: Registration = await this.registrationsRepository.create({
      registrationId: uuidv4(),
      timeStart: event.timeStart,
      timeEnd: event.timeEnd
    });
    
    // Update user registrationIds
    let registrationIds: string[] = user.registrationIds;
    registrationIds.push(registration.registrationId);
    
    this.usersService.updateRegistrationIds(user.userId, registrationIds);
  
    // Update event registrationIds
    registrationIds = event.registrationIds;
    registrationIds.push(registration.registrationId);
    this.eventsService.updateRegistrationIds(event.eventId, registrationIds);

    this.registrationsRepository.create(registration);

    return registration;
  }

  async removeRegistration(registrationId: string, user: User, event: Event): Promise<Registration> {
    // Remove registration from user and events registrationIds
    let userRegIds: string[] = user.registrationIds.filter(regId => regId != registrationId);
    this.usersService.updateRegistrationIds(user.userId, userRegIds);

    let eventRegIds: string[] = event.registrationIds.filter(regId => regId != registrationId);
    this.eventsService.updateRegistrationIds(event.eventId, eventRegIds);

    // Remove registration from repository
    return await this.registrationsRepository.findOneAndDelete({ registrationId });

  }

}