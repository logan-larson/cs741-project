import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
const bcrypt = require('bcrypt');
//import { bcrypt } from 'bcrypt';

import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.usersRepository.findOne({ userId });
  }

  async createUser(username: string, password: string, type: string): Promise<User> {

    const saltRounds = 10;

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return this.usersRepository.create({
      userId: uuidv4(),
      username: username,
      password: hashedPassword,
      type: type,
      activeRegistrationIds: [],
      inactiveRegistrationIds: [],
      donationIds: [],
      isActive: true
    });
  }

  async validateUser(username: string, password: string): Promise<User> {
    // Find by username
    const user: User = await this.usersRepository.findOne({ username });

    // Validate user exists and password is the same as one provided
    if (!user) {
      return null;
    }

    const result: boolean = await bcrypt.compare(password, user.password)

    if (!user.isActive) {
      return null;
    }

    return result ? user : null;
  }

  async updateRegistrationIds(userId: string, activeRegistrationIds: string[], inactiveRegistrationIds: string[]): Promise<boolean> {
    let user: User;
    if (!inactiveRegistrationIds) {
      user = await this.usersRepository.findOneAndUpdate({ userId }, { activeRegistrationIds });
    } else {
      user = await this.usersRepository.findOneAndUpdate({ userId }, { activeRegistrationIds, inactiveRegistrationIds });
    }
    
    return user != undefined;
  }

  async updateDonationIds(userId: string, donationIds: string[]): Promise<boolean> {
    let user: User = await this.usersRepository.findOneAndUpdate({ userId }, { donationIds });
    
    return user != undefined;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

}