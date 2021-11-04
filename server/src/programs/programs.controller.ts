import { Body, Controller, Get, Post, Session } from "@nestjs/common";
import { CreateProgramDto } from "./dtos/create-program.dto";
import { ProgramsService } from "./programs.service";
import { Program } from "./schemas/program.schema";

@Controller('api/programs')
export class ProgramsController {

  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  async getAllPrograms() {
    return this.programsService.getAllPrograms();
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

}