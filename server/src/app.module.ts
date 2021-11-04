import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:QOVtljjlsfWxUS9N@cluster0.bfohk.mongodb.net/cs741-project?retryWrites=true&w=majority'),
    UsersModule,
    EventsModule,
    ProgramsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
