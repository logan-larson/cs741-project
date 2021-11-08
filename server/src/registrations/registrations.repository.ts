import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Registration, RegistrationDocument } from "./schemas/registration.schema";


@Injectable()
export class RegistrationsRepository {

  constructor(@InjectModel(Registration.name) private registrationModel: Model<RegistrationDocument>) {}

  async findOne(registrationFilterQuery: FilterQuery<RegistrationDocument>): Promise<Registration> {
    return this.registrationModel.findOne(registrationFilterQuery);
  }

  async create(registration: Registration): Promise<Registration> {
    const newRegistration = new this.registrationModel(registration);
    return newRegistration.save();
  }

  async findOneAndUpdate(registrationFilterQuery: FilterQuery<RegistrationDocument>, registration: Partial<Registration>): Promise<Registration> {
    return this.registrationModel.findOneAndUpdate(registrationFilterQuery, registration);
  }
}