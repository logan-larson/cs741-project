import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ValidateUserDto } from './dtos/validate-user.dto';
import { User } from './schemas/user.schema';

import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  
  // User registration
  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto): Promise<User> {
      console.log(createUserDto);
      return this.usersService.createUser(createUserDto.username, createUserDto.password, createUserDto.type);
  }

  // User login
  @Post('user')
  async validateUser(
    @Body() validateUserDto: ValidateUserDto): Promise<User> {
      return this.usersService.validateUser(validateUserDto.username, validateUserDto.password);
    }
}
