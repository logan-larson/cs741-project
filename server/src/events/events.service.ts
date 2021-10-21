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
      volunteersNeeded: volunteersNeeded
    })
  }

}
