import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsModule } from "src/events/events.module";
import { UsersModule } from "src/users/users.module";
import { RegistrationsController } from "./registrations.controller";
import { RegistrationsRepository } from "./registrations.repository";
import { RegistrationsService } from "./registrations.service";

import { Registration, RegistrationSchema } from "./schemas/registration.schema";

@Module({
  imports: [
    UsersModule,
    EventsModule,
    MongooseModule.forFeature([{ name: Registration.name, schema: RegistrationSchema}])
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, RegistrationsRepository]
})
export class RegistrationsModule {}