import { Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersRepository } from 'src/users/users.repository';
import { v4 as uuidv4 } from 'uuid';

import { EventsRepository } from './events.repository';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventsService {

  constructor(private readonly eventsRepository: EventsRepository, private readonly usersRepository: UsersRepository) {}

  async getAllEvents(): Promise<Event[]> {
    return this.eventsRepository.findAll();
  }

  async getAllIndependentEvents(): Promise<Event[]> {
    return this.eventsRepository.findMany({ isIndependent: true });
  }

  async getEventById(eventId: string): Promise<Event> {
    return this.eventsRepository.findOne({ eventId });
  }

  async getEventsByIds(eventIds: string[]): Promise<Event[]> {
    if (!eventIds || eventIds.length == 0) {
      return [];
    }

    let events: Event[] = [];

    for (const eventIndex in eventIds) {
      const event: Event = await this.eventsRepository.findOne({ eventId: eventIds[eventIndex] });
      
      events.push(event);
    }

    return events; 
  }

  async createEvent(
    userId: string,
    name: string,
    description: string,
    date: Date,
    timeStart: Date,
    timeEnd: Date,
    volunteerCountRequirement: number,
    isIndependent: boolean
  ): Promise<Event> {
    // Validate user is admin with userId
    let user: User = await this.usersRepository.findOne({ userId });
    if (user.type != "admin") {
      return null;
    }

    return this.eventsRepository.create({
      eventId: uuidv4(),
      name: name,
      description: description,
      date: date,
      timeStart: timeStart,
      timeEnd: timeEnd,
      volunteerCountRequirement: volunteerCountRequirement,
      registrationIds: [],
      donationIds: [],
      isIndependent: isIndependent,
      isActive: true,
    });
  }

  async getVolunteerRegistrationStatus(eventId: string, userId: string): Promise<boolean> {
    // Get specifed event
    const event: Event = await this.eventsRepository.findOne({ eventId });
    const user: User = await this.usersRepository.findOne({ userId });

    // for each registration id in event, if has registration id associated then is registered
    for (const eventRegId in event.registrationIds) {
      if (user.activeRegistrationIds.find((userRegId) => userRegId == eventRegId)) {
        return true
      }
    }

    return true;
  }

  async updateRegistrationIds(eventId: string, registrationIds: string[]): Promise<boolean> {
    let event: Event = await this.eventsRepository.findOneAndUpdate({ eventId }, { registrationIds });
    
    return event != undefined;
  }

  async updateDonationIds(eventId: string, donationIds: string[]): Promise<boolean> {
    let event: Event = await this.eventsRepository.findOneAndUpdate({ eventId }, { donationIds });
    
    return event != undefined;
  }

  async cancelEvent(eventId: string): Promise<Event> {
    return await this.eventsRepository.findOneAndUpdate({ eventId }, { isActive: false });
  }

}
