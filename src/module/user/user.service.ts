import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import {
  CreateUserDto,
  createAccountFields,
  newAccountFields,
} from './dto/create-user.dto';
import * as lodash from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { doesAccountExists } from './user.helper';
import { UserProfile } from './interface/user-profile.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getUserById(id: string): Promise<UserProfile> {
    return this.userModel.findById(id).lean();
  }

  async getAllUsers(): Promise<UserProfile[]> {
    return this.userModel.find({}).lean();
  }

  async registerUser(createAccountDto: CreateUserDto): Promise<UserProfile> {
    const filteredAccountDetails = lodash.pick(
      createAccountDto,
      createAccountFields,
    );

    const accountExists = await doesAccountExists(
      filteredAccountDetails.email,
      this.userModel,
    );

    if (accountExists) {
      throw new BadRequestException('Account is already taken.');
    }

    const newAccount = await this.userModel.create(filteredAccountDetails);
    this.logger.log(`New user with id: ${newAccount.id} is created.`);

    const lean = await newAccount.toObject();
    const filteredNewAccountDetails = lodash.pick(lean, newAccountFields);

    return filteredNewAccountDetails as UserProfile;
  }

  /*
    - if there is addition time, check whether phone, email exists or not before updating
  */
  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserProfile> {
    const user = await this.userModel.findById(id).lean();

    if (!user) {
      throw new BadRequestException('Invalid id given');
    }

    const updateUserProfile = {
      ...user,
      ...updateUserDto,
      updatedAt: new Date(),
    };

    const updatedAccount = await this.userModel
      .findByIdAndUpdate(id, updateUserProfile, { new: true })
      .lean();

    return updatedAccount;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new BadRequestException('Invalid user id given.');
    }

    await this.userModel.findByIdAndDelete(id);
  }
}
