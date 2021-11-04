import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProgramsController } from "./programs.controller";
import { ProgramsRepository } from "./programs.repository";
import { ProgramsService } from "./programs.service";
import { Program, ProgramSchema } from "./schemas/program.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema}])],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramsRepository]
})
export class ProgramsModule {}