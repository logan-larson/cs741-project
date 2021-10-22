import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { EventRepository } from './events.repository';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventsService {

  constructor(private readonly eventRepository: EventRepository) {}

  async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.findAll();
  }

  async createEvent(
    userId: string,
    name: string,
    description: string,
    date: Date,
    timeStart: Date,
    timeEnd: Date,
    volunteersNeeded: number
  ): Promise<Event> {
    // Validate user is admin with userId
    console.log(userId);

    return this.eventRepository.create({
      eventId: uuidv4(),
      name: name,
      description: description,
      date: date,
      timeStart: timeStart,
      timeEnd: timeEnd,
      volunteersNeeded: volunteersNeeded,
      volunteerUserIds: []
    })
  }

  async getVolunteerRegistrationStatus(eventId: string, userId: string): Promise<boolean> {
    // Get specifed event
    const event: Event = await this.eventRepository.findOne({ eventId });

    // Check if user is a volunteer for event
    if (!event.volunteerUserIds.includes(userId)) {
      return false;
    }

    return true;
  }

  async changeEventVolunteerStatus(eventId: string, userId: string): Promise<Event> {
    const isRegistered: boolean = await this.getVolunteerRegistrationStatus(eventId, userId);
    const event: Event = await this.eventRepository.findOne({ eventId });
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
  
    return this.eventRepository.findOneAndUpdate({ eventId }, { volunteersNeeded: eventVolunteersNeeded, volunteerUserIds: eventVolunteerUserIds });
  }

}