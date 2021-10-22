import { Body, Controller, Get, Param, Post, Put, Session } from '@nestjs/common';
import { UserIdDto } from 'src/users/dtos/user-id.dto';
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

  @Get(':eventId/volunteers/:userId')
  async getVolunteerRegistrationStatus(
    @Param('eventId') eventId: string,
    @Param('userId') userId: string
  ): Promise<boolean> {
    return this.eventsService.getVolunteerRegistrationStatus(eventId, userId);
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

  @Put(':eventId/volunteers')
  async addVolunteerToEvent(
    @Param('eventId') eventId: string,
    @Body() userIdDto: UserIdDto
  ): Promise<Event> {
    return this.eventsService.changeEventVolunteerStatus(eventId, userIdDto.userId);
  }

}
