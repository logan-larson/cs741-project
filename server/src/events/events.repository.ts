import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Event, EventDocument } from "./schemas/event.schema";


@Injectable()
export class EventRepository {

  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async findAll(): Promise<Event[]> {
    return this.eventModel.find();
  }

  async create(event: Event): Promise<Event> {
    const newEvent = new this.eventModel(event);
    return newEvent.save();
  }

}