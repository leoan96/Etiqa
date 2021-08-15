import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User } from '../schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfile } from './interface/user-profile.interface';
import {
  createUserDtoMock,
  newUserMock,
  updatedUserMock,
  updateUserDtoMock,
  userMock,
} from './mock/user.mock';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let userModel = {
    findById: jest.fn().mockImplementation(() => {
      return {
        lean: jest.fn(),
      };
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  afterEach(async () => {
    await jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user profile based on the given user id', async () => {
      const mockUser: UserProfile = userMock;

      jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);

      const result: UserProfile = await userService.getUserById(mockUser.id);

      expect(userService.getUserById).toHaveBeenCalledWith(mockUser.id);
      expect(result).toBe(mockUser);
    });
  });

  describe('getAllUsers', () => {
    it('should return all user profiles', async () => {
      const mockResponse: UserProfile[] = [userMock];

      jest.spyOn(userService, 'getAllUsers').mockResolvedValue(mockResponse);

      const result: UserProfile[] = await userService.getAllUsers();

      expect(userService.getAllUsers).toHaveBeenCalled();
      expect(result).toStrictEqual([userMock]);
    });
  });

  describe('registerUser', () => {
    it('should create a new user', async () => {
      const mockCreateUserDto: CreateUserDto = createUserDtoMock;
      const mockResponse: UserProfile = newUserMock;

      jest.spyOn(userService, 'registerUser').mockResolvedValue(mockResponse);

      const result: UserProfile = await userService.registerUser(
        mockCreateUserDto,
      );

      expect(userService.registerUser).toBeCalledWith(mockCreateUserDto);
      expect(result).toStrictEqual(mockResponse);
    });
  });

  describe('updateUser', () => {
    it('should update a user of the given id', async () => {
      const mockId = userMock.id;
      const mockUpdateUserDto: UpdateUserDto = updateUserDtoMock;
      const mockResponse: UserProfile = updatedUserMock;

      jest.spyOn(userService, 'updateUser').mockResolvedValue(mockResponse);

      const result: UserProfile = await userService.updateUser(
        mockId,
        mockUpdateUserDto,
      );

      expect(userService.updateUser).toBeCalledWith(mockId, mockUpdateUserDto);
      expect(result).toStrictEqual(mockResponse);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user of the given id', async () => {
      const mockId = userMock.id;

      jest.spyOn(userService, 'deleteUser').mockResolvedValue(null);

      const result: void = await userService.deleteUser(mockId);

      expect(userService.deleteUser).toHaveBeenCalledWith(mockId);
      expect(result).toBe(null);
    });
  });
});
