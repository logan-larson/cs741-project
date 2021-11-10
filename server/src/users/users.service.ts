import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async createUser(username: string, password: string, type: string): Promise<User> {
    return this.usersRepository.create({
      userId: uuidv4(),
      username: username,
      password: password,
      type: type,
      registrationIds: [],
      donationIds: [],
    });
  }

  async validateUser(username: string, password: string): Promise<User> {
    // Find by username
    const user: User = await this.usersRepository.findOne({ username });

    // Validate user exists and password is the same as one provided
    if (!user || user.password != password) {
      return null;
    }

    return user;
  }

  async updateRegistrationIds(userId: string, registrationIds: string[]): Promise<boolean> {
    let user: User = await this.usersRepository.findOneAndUpdate({ userId }, { registrationIds });
    
    return user != undefined;
  }

  async updateDonationIds(userId: string, donationIds: string[]): Promise<boolean> {
    let user: User = await this.usersRepository.findOneAndUpdate({ userId }, { donationIds });
    
    return user != undefined;
  }
}