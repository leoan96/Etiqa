import { Test } from '@nestjs/testing';
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
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    registerUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockResponse: UserProfile[] = [userMock];

      mockUserService.getAllUsers.mockResolvedValue(mockResponse);

      const result: UserProfile[] = await userController.getAllUsers();

      expect(result.length).toBe(1);
      expect(result[0].username).toBe(userMock.username);
      expect(result[0].email).toBe(userMock.email);
      expect(result[0].phoneNumber).toBe(userMock.phoneNumber);
      expect(result[0].skillsets).toBe(userMock.skillsets);
      expect(result[0].hobby).toBe(userMock.hobby);
      expect(result[0].id).toBe(userMock.id);
      expect(result[0].createdAt).toBe(userMock.createdAt);
      expect(result[0].updatedAt).toBe(userMock.updatedAt);
    });
  });

  describe('getUserById', () => {
    it('should return one user based on user id', async () => {
      const mockResponse: UserProfile = userMock;

      mockUserService.getUserById.mockResolvedValue(mockResponse);

      const result: UserProfile = await userController.getUserById(userMock.id);

      expect(result.username).toBe(mockResponse.username);
      expect(result.email).toBe(mockResponse.email);
      expect(result.phoneNumber).toBe(mockResponse.phoneNumber);
      expect(result.skillsets).toBe(mockResponse.skillsets);
      expect(result.hobby).toBe(mockResponse.hobby);
      expect(result.id).toBe(mockResponse.id);
      expect(result.createdAt).toBe(mockResponse.createdAt);
      expect(result.updatedAt).toBe(mockResponse.updatedAt);
    });
  });

  describe('registerUser', () => {
    it('should create a user with the given data', async () => {
      const mockCreateUserDto: CreateUserDto = createUserDtoMock;
      const mockResponse: UserProfile = newUserMock;

      mockUserService.registerUser.mockResolvedValue(mockResponse);

      const result: UserProfile = await userController.registerUser(
        mockCreateUserDto,
      );

      expect(result.username).toBe(mockResponse.username);
      expect(result.email).toBe(mockResponse.email);
      expect(result.phoneNumber).toBe(mockResponse.phoneNumber);
      expect(result.skillsets).toBe(mockResponse.skillsets);
      expect(result.hobby).toBe(mockResponse.hobby);
      expect(result.id).toBe(mockResponse.id);
      expect(result.createdAt).toBeDefined();
    });
  });

  describe('updateUser', () => {
    it('should update a user based on user id', async () => {
      const mockId = userMock.id;
      const mockUpdateUserDto: UpdateUserDto = updateUserDtoMock;
      const mockResponse: UserProfile = updatedUserMock;

      mockUserService.updateUser.mockResolvedValue(mockResponse);

      const result: UserProfile = await userController.updateUser(
        mockUpdateUserDto,
        mockId,
      );

      expect(result.username).toBe(mockResponse.username);
      expect(result.email).toBe(mockResponse.email);
      expect(result.phoneNumber).toBe(mockResponse.phoneNumber);
      expect(result.skillsets).toBe(mockResponse.skillsets);
      expect(result.hobby).toBe(mockResponse.hobby);
      expect(result.id).toBe(mockResponse.id);
      expect(result.createdAt).toBeDefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user based on user id', async () => {
      const mockId = userMock.id;
      const mockResponse = null;

      mockUserService.deleteUser.mockResolvedValue(mockResponse);

      const result: void = await userController.deleteUser(mockId);

      expect(result).toBe(mockResponse);
    });
  });
});
