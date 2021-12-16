import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:QOVtljjlsfWxUS9N@cluster0.bfohk.mongodb.net/cs741-project?retryWrites=true&w=majority'),
    UsersModule,
    EventsModule,
    RegistrationsModule,
    DonationsModule
  ],
  providers: [],
})
export class AppModule {}
