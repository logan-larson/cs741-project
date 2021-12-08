import { Body, Controller, Get, Param, Post, Put, Session } from '@nestjs/common';
import { ProgramsService } from 'src/programs/programs.service';
import { UserIdDto } from 'src/users/dtos/user-id.dto';
import { CreateEventDto } from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';

@Controller('api/events')
export class EventsController {

  constructor(
    private readonly eventsService: EventsService,
    private readonly programsService: ProgramsService
  ) {}

  @Get()
  async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get('independent')
  async getAllIndependentEvents() {
    return this.eventsService.getAllIndependentEvents();
  }

  @Get(':eventId')
  async getEventById(
    @Param('eventId') eventId: string
  ): Promise<Event> {
    return this.eventsService.getEventById(eventId);
  }


  // -- Deprecated -- 
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

    console.log("hit");

    let event: Event = await this.eventsService.createEvent(
      session.userId,
      createEventDto.name,
      createEventDto.description,
      createEventDto.date,
      createEventDto.timeStart,
      createEventDto.timeEnd,
      createEventDto.volunteerCountRequirement,
      createEventDto.isIndependent
    );

    return event;
  }

  @Post(':eventId')
  async cancelEvent(
    @Param('eventId') eventId: string
  ): Promise<Event> {
    return await this.eventsService.cancelEvent(eventId);
  }

}
