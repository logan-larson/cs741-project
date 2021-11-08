import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RegistrationsController } from "./registrations.controller";
import { RegistrationsRepository } from "./registrations.repository";
import { RegistrationsService } from "./registrations.service";

import { Registration, RegistrationSchema } from "./schemas/registration.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Registration.name, schema: RegistrationSchema}])],
  controllers: [RegistrationsController],
  providers: [RegistrationsService, RegistrationsRepository]
})
export class RegistrationsModule {}