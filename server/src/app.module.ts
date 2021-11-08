import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ProgramsModule } from './programs/programs.module';
import { RegistrationsModule } from './registrations/registrations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:QOVtljjlsfWxUS9N@cluster0.bfohk.mongodb.net/cs741-project?retryWrites=true&w=majority'),
    UsersModule,
    EventsModule,
    ProgramsModule,
    RegistrationsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
