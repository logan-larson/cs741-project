import { Body, Controller, Get, Param, Post, Put, Session } from "@nestjs/common";
import { EventsService } from "src/events/events.service";
import { Event } from "src/events/schemas/event.schema";
import { CreateProgramDto } from "./dtos/create-program.dto";
import { ProgramsService } from "./programs.service";
import { Program } from "./schemas/program.schema";

@Controller('api/programs')
export class ProgramsController {

  constructor(
    private readonly programsService: ProgramsService,
    private readonly eventsService: EventsService
  ) {}

  @Get()
  async getAllPrograms() {
    return this.programsService.getAllPrograms();
  }

  @Get(':programId/events')
  async getAssociatedEvents(
    @Param('programId') programId: string
  ): Promise<Event[]> {
    let program: Program = await this.programsService.getProgramById(programId);

    return this.eventsService.getEventsByIds(program.eventIds);
  }

  @Post()
  async createProgram(
    @Session() session: Record<string, any>,
    @Body() createProgramDto: CreateProgramDto
  ): Promise<Program> {
    return this.programsService.createProgram(
      session.userId,
      createProgramDto.name,
      createProgramDto.description,
      createProgramDto.dateStart,
      createProgramDto.dateEnd
    );
  }

  @Put(':programId/event/:eventId')
  async updateEventIds(
    @Param('programId') programId: string,
    @Param('eventId') eventId: string,
  ): Promise<Program> {
    return this.programsService.updateEventIds(programId, eventId);
  }

}