import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<UserDocument>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(userFilterQuery: FilterQuery<UserDocument>, user: Partial<User>): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user);
  }

}
