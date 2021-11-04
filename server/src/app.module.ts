import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { ProgramsService } from './services/programs/programs.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb+srv://admin:QOVtljjlsfWxUS9N@cluster0.bfohk.mongodb.net/cs741-project?retryWrites=true&w=majority'),
    EventsModule,
  ],
  controllers: [],
  providers: [ProgramsService],
})
export class AppModule {}
