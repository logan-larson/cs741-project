import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

import { ProgramsRepository } from "./programs.repository";
import { Program } from "./schemas/program.schema";

@Injectable()
export class ProgramsService {

  constructor(private readonly programsRepository: ProgramsRepository) {}

  async getAllPrograms(): Promise<Program[]> {
    return this.programsRepository.findAll();
  }

  async getProgramById(programId: string): Promise<Program> {
    return this.programsRepository.findOne({ programId: programId });
  }

  async updateEventIds(programId: string, eventId: string): Promise<Program> {
    let eventIds: string[] = await (await this.programsRepository.findOne({ programId: programId })).eventIds;
    eventIds.push(eventId);
    return this.programsRepository.findOneAndUpdate({ programId }, { eventIds: eventIds });
  }

  async createProgram(
    userId: string,
    name: string,
    description: string,
    dateStart: Date,
    dateEnd: Date,
  ): Promise<Program> {
    // Validate user creating the program is admin
    console.log(userId);

    return this.programsRepository.create({
      programId: uuidv4(),
      name: name,
      description: description,
      dateStart: dateStart,
      dateEnd: dateEnd,
      eventIds: [],
      donationIds: [],
    });
  }

}