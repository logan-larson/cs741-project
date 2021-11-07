import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { EventsRepository } from './events.repository';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventsService {

  constructor(private readonly eventsRepository: EventsRepository) {}

  async getAllEvents(): Promise<Event[]> {
    return this.eventsRepository.findAll();
  }

  async getAllIndependentEvents(): Promise<Event[]> {
    return this.eventsRepository.findMany({ isIndependent: true });
  }

  async getEventsByIds(eventIds: string[]): Promise<Event[]> {
    if (!eventIds || eventIds.length == 0) {
      return [];
    }

    let events: Event[] = [];


    for (const eventIndex in eventIds) {
      const event: Event = await this.eventsRepository.findOne({ eventId: eventIds[eventIndex] });


      console.log(event);
      
      events.push(event);
    }

    console.log(events);
    

    return events; 
  }

  async createEvent(
    userId: string,
    name: string,
    description: string,
    date: Date,
    timeStart: Date,
    timeEnd: Date,
    volunteersNeeded: number,
    isIndependent: boolean
  ): Promise<Event> {
    // Validate user is admin with userId
    console.log(userId);

    return this.eventsRepository.create({
      eventId: uuidv4(),
      name: name,
      description: description,
      date: date,
      timeStart: timeStart,
      timeEnd: timeEnd,
      volunteersNeeded: volunteersNeeded,
      volunteerUserIds: [],
      isIndependent: isIndependent
    })
  }

  async getVolunteerRegistrationStatus(eventId: string, userId: string): Promise<boolean> {
    // Get specifed event
    const event: Event = await this.eventsRepository.findOne({ eventId });

    // Check if user is a volunteer for event
    if (!event.volunteerUserIds.includes(userId)) {
      return false;
    }

    return true;
  }

  async changeEventVolunteerStatus(eventId: string, userId: string): Promise<Event> {
    const isRegistered: boolean = await this.getVolunteerRegistrationStatus(eventId, userId);
    const event: Event = await this.eventsRepository.findOne({ eventId });
    let eventVolunteerUserIds: string[] = event.volunteerUserIds;
    let eventVolunteersNeeded: number = event.volunteersNeeded;

    if (isRegistered) {
      // If user was registered, remove them from the list of volunteers
      eventVolunteerUserIds = eventVolunteerUserIds.filter(uid => uid != userId);
      eventVolunteersNeeded += 1;
    } else {
      // If user wasn't registered, add them to the list of volunteers
      eventVolunteerUserIds.push(userId);
      eventVolunteersNeeded -= 1;
    }
  
    return this.eventsRepository.findOneAndUpdate({ eventId }, { volunteersNeeded: eventVolunteersNeeded, volunteerUserIds: eventVolunteerUserIds });
  }

}
