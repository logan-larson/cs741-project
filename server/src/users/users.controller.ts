import { Body, ConsoleLogger, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ValidateUserDto } from './dtos/validate-user.dto';
import { User } from './schemas/user.schema';

import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get('user')
  async getCurrentUser(@Session() session: Record<string, any>): Promise<User> {
    console.log(session.userId);
    if (!session.userId) {
      return null;
    }
    return this.usersService.getUserById(session.userId);
  }

  @Get('user/:userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    console.log("home load: " + userId);
    return this.usersService.getUserById(userId);
  }
  
  // User registration
  @Post()
  async createUser(
    @Session() session: Record<string, any>,
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {
    let user: User = await this.usersService.createUser(createUserDto.username, createUserDto.password, createUserDto.type);
    console.log("create account " + user.userId);
    session.userId = user.userId;
    return user;
  }

  // User login
  @Post('user')
  async validateUser(
    @Session() session: Record<string, any>,
    @Body() validateUserDto: ValidateUserDto
  ): Promise<User> {
    let user: User = await this.usersService.validateUser(validateUserDto.username, validateUserDto.password);
    if (user) {
      console.log("login: " + user.userId);
      session.userId = user.userId;
    }
    return user;
  }

  // User logout
  @Post('user/:userId')
  async logoutUser(
    @Session() session: Record<string, any>,
    @Param('userId') userId: string
  ): Promise<boolean> {
    console.log("logout " + userId);
    console.log("logout session " + session.userId);
    session.userId = null;
    return true;
  }
}
