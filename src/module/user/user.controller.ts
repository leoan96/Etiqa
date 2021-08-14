import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LeanDocument } from 'mongoose';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { UserDocument } from '../schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfile } from './interface/user-profile.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<UserProfile[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserProfile> {
    return this.userService.getUserById(id);
  }

  @Post('register')
  async registerUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<UserProfile> {
    return this.userService.registerUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserProfile> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
