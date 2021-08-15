import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserProfile } from '../interface/user-profile.interface';

const mockDate = new Date('2021-08-15T07:14:16.953Z');

export const userMock: UserProfile = {
  username: 'john',
  email: 'john@gmail.com',
  phoneNumber: '60123456789',
  skillsets: ['java', 'javascript'],
  hobby: ['swimming', 'bowling'],
  id: '5a2539b41c574006c46f1a07',
  createdAt: mockDate,
  updatedAt: mockDate,
};

export const createUserDtoMock: CreateUserDto = {
  username: 'john',
  email: 'john@gmail.com',
  phoneNumber: '60123456789',
  skillsets: ['java', 'javascript'],
  hobby: ['swimming', 'bowling'],
};

export const newUserMock: UserProfile = {
  username: 'john',
  email: 'john@gmail.com',
  phoneNumber: '60123456789',
  skillsets: ['java', 'javascript'],
  hobby: ['swimming', 'bowling'],
  id: '5a2539b41c574006c46f1a07',
  createdAt: mockDate,
};

export const updateUserDtoMock: UpdateUserDto = {
  username: 'sam',
  email: 'sam@gmail.com',
  phoneNumber: '60987654321',
  skillsets: ['java', 'javascript'],
  hobby: ['swimming', 'bowling'],
};

export const updatedUserMock: UserProfile = {
  username: 'sam',
  email: 'sam@gmail.com',
  phoneNumber: '60987654321',
  skillsets: ['java', 'javascript'],
  hobby: ['swimming', 'bowling'],
  createdAt: mockDate,
};
