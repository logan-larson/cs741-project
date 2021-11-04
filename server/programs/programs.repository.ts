import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Program, ProgramDocument } from "./schemas/program.schema";

@Injectable()
export class ProgramsRepository {

  constructor(@InjectModel(Program.name) private programModel: Model<ProgramDocument>) {}
  
  async findOne(programFilterQuery: FilterQuery<ProgramDocument>): Promise<Program> {
    return this.programModel.findOne(programFilterQuery);
  }

  async findAll(): Promise<Program[]> {
    return this.programModel.find();
  }

  async create(program: Program): Promise<Program> {
    const newProgram = new this.programModel(program);
    return newProgram.save();
  }

  async findOneAndUpdate(programFilterQuery: FilterQuery<ProgramDocument>, program: Partial<Program>): Promise<Program> {
    return this.programModel.findOneAndUpdate(programFilterQuery, program, { new: true });
  }

}