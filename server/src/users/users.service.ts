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

  async createUser(username: string, password: string): Promise<User> {
    return this.usersRepository.create({
      userId: uuidv4(),
      username: username,
      password: password
    });
  }
}