import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { EventsService } from './events.service';
import { Event, EventSchema } from './schemas/event.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema}])
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsService],
})
export class EventsModule {}
