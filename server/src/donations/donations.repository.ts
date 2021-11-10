import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Donation, DonationDocument } from "./schemas/donation.schema";

@Injectable()
export class DonationsRepository {

  constructor(@InjectModel(Donation.name) private donationModel: Model<DonationDocument>) {}

  async findOne(donationFilterQuery: FilterQuery<DonationDocument>): Promise<Donation> {
    return this.donationModel.findOne(donationFilterQuery);
  }

  async findWithIdList(donationIds: string[]): Promise<Donation[]> {
    return this.donationModel.find({ donationId: {$in: donationIds} });
  }

  async create(donation: Donation): Promise<Donation> {
    const newDonation = new this.donationModel(donation);
    return newDonation.save();
  }

  async findOneAndUpdate(donationFilterQuery: FilterQuery<DonationDocument>, donation: Partial<Donation>): Promise<Donation> {
    return this.donationModel.findOneAndUpdate(donationFilterQuery, donation);
  }

  async findOneAndDelete(donationFilterQuery: FilterQuery<DonationDocument>) {
    return this.donationModel.findOneAndDelete(donationFilterQuery);
  }
}