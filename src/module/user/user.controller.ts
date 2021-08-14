import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserProfile } from './interface/user-profile.interface';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    operationId: 'getAllUsers',
    summary: 'Get all users',
    description: 'Retrieves all users',
  })
  @ApiOkResponse({
    description: 'Retrieved all users',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went terribly wrong',
  })
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<UserProfile[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'getUserById',
    summary: 'Get a single account by user id',
    description: 'Retrieves a specific acccount',
  })
  @ApiOkResponse({
    description: 'Retrieved account',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went terribly wrong',
  })
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string): Promise<UserProfile> {
    return this.userService.getUserById(id);
  }

  @Post('register')
  @ApiOperation({
    operationId: 'registerUser',
    summary: 'Create a new user',
    description: 'Create a new user using validated values',
  })
  @ApiOkResponse({
    description: 'Successfully created a new user',
  })
  @ApiBadRequestResponse({
    description: 'Validation error. Please enter valid values',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went terribly wrong',
  })
  @HttpCode(HttpStatus.CREATED)
  async registerUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<UserProfile> {
    return this.userService.registerUser(createUserDto);
  }

  @Put(':id')
  @ApiOperation({
    operationId: 'updateUser',
    summary: 'Update user',
    description: 'Update user',
  })
  @ApiOkResponse({
    description: 'Updated user with given values',
  })
  @ApiBadRequestResponse({
    description: 'Invalid update details',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went terribly wrong',
  })
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UserProfile> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    operationId: 'deleteUser',
    summary: 'Delete user',
    description: 'Delete user',
  })
  @ApiNoContentResponse({
    description: 'Successfully deleted account',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went terribly wrong',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
