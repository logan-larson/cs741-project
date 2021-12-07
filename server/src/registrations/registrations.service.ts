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

  async checkOverlap(user: User, clientEvent: Event): Promise<boolean> {

    let event: Event = await this.eventsService.getEventById(clientEvent.eventId);
    
    if (user.activeRegistrationIds.length == 0) {
      return false;
    }

    // For each registration id in user's reg ids
    for (const index in user.activeRegistrationIds) {
      // Get registration object
      let registration: Registration = await this.registrationsRepository.findOne({ registrationId: user.activeRegistrationIds[index] })

      // Check if times overlap with event times
      let regTimeStart: number = registration.timeStart.valueOf();
      let regTimeEnd: number = registration.timeEnd.valueOf();
      let eventTimeStart: number = event.timeStart.valueOf();
      let eventTimeEnd: number = event.timeEnd.valueOf();
      
      // -- check if event start time or end time is within the registration time
      if (regTimeStart >= eventTimeStart && regTimeStart <= eventTimeEnd) {
        return true;
      } else if (regTimeEnd >= eventTimeStart && regTimeEnd <= eventTimeEnd) {
        return true;
      }
    }

    return false;
  }

  async createRegistration(user: User, event: Event): Promise<Registration> {
    let registration: Registration = await this.registrationsRepository.create({
      registrationId: uuidv4(),
      timeStart: event.timeStart,
      timeEnd: event.timeEnd,
      eventId: event.eventId
    });
    
    // Update user registrationIds
    let registrationIds: string[] = user.activeRegistrationIds;
    registrationIds.push(registration.registrationId);
    this.usersService.updateRegistrationIds(user.userId, registrationIds, null);
  
    // Update event registrationIds
    registrationIds = event.registrationIds;
    registrationIds.push(registration.registrationId);
    this.eventsService.updateRegistrationIds(event.eventId, registrationIds);

    this.registrationsRepository.create(registration);

    return registration;
  }

  async activateRegistration(registrationId: string, u: User, event: Event): Promise<Registration> {

    let user: User = await this.usersService.getUserById(u.userId);

    let userActiveRegIds: string[] = user.activeRegistrationIds;
    userActiveRegIds.push(registrationId);
    let userInactiveRegIds: string[] = user.inactiveRegistrationIds.filter(regId => regId != registrationId);

    let updatedUserRegs: boolean = await this.usersService.updateRegistrationIds(
      user.userId, 
      userActiveRegIds,
      userInactiveRegIds
    );

    if (!updatedUserRegs) {
      return null;
    }

    let eventRegIds: string[] = event.registrationIds;
    eventRegIds.push(registrationId);
    let updatedEventRegs: boolean = await this.eventsService.updateRegistrationIds(event.eventId, eventRegIds);
    if (!updatedEventRegs) {
      return null;
    }

    return await this.registrationsRepository.findOne({ registrationId });
  }

  async deactivateRegistration(registrationId: string, u: User, event: Event): Promise<Registration> {

    let user: User = await this.usersService.getUserById(u.userId);

    // Remove registration from user and events registrationIds
    let userActiveRegIds: string[] = user.activeRegistrationIds.filter(regId => regId != registrationId);
    let userInactiveRegIds: string[] = user.inactiveRegistrationIds;
    userInactiveRegIds.push(registrationId);

    let updatedUserRegs: boolean = await this.usersService.updateRegistrationIds(
      user.userId, 
      userActiveRegIds,
      userInactiveRegIds
    );

    if (!updatedUserRegs) {
      return null;
    }

    let eventRegIds: string[] = event.registrationIds.filter(regId => regId != registrationId);
    let updatedEventRegs: boolean = await this.eventsService.updateRegistrationIds(event.eventId, eventRegIds);
    if (!updatedEventRegs) {
      return null;
    }

    return await this.registrationsRepository.findOne({ registrationId });
  }

  async getEventRegistrations(eventId: string): Promise<Registration[]> {
    return await this.registrationsRepository.findMany({eventId});
  }

}