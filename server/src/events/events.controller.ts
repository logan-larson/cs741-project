import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';

@Controller('api/events')
export class EventsController {

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Post()
  async createEvent(
    @Session() session: Record<string, any>,
    @Body() createEventDto: CreateEventDto
  ): Promise<Event> {
    return this.eventsService.createEvent(
      session.userId,
      createEventDto.name,
      createEventDto.description,
      createEventDto.date,
      createEventDto.timeStart,
      createEventDto.timeEnd,
      createEventDto.volunteersNeeded
      );
  }
}
