import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsModule } from "src/events/events.module";
import { UsersModule } from "src/users/users.module";
import { ProgramsController } from "./programs.controller";
import { ProgramsRepository } from "./programs.repository";
import { ProgramsService } from "./programs.service";
import { Program, ProgramSchema } from "./schemas/program.schema";

@Module({
  imports: [
    forwardRef(() => EventsModule),
    UsersModule,
    MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema}])
  ],
  controllers: [ProgramsController],
  providers: [ProgramsService, ProgramsRepository],
  exports: [ProgramsService]
})
export class ProgramsModule {}