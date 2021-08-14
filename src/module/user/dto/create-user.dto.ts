import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'username', type: 'string', example: 'john' })
  @IsString()
  @Length(3, 16)
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'email',
    type: 'string',
    example: 'john@gmail.com',
  })
  @IsEmail()
  @MaxLength(50)
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'phone number',
    type: 'string',
    example: '920-291-2140',
  })
  @IsString()
  @Length(11, 12)
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({
    description: 'skillsets',
    type: 'string',
    example: ['java', 'typescript'],
  })
  @IsArray()
  @IsOptional()
  skillsets: string[];

  @ApiProperty({
    description: 'hobby',
    type: 'string',
    example: ['swimming', 'reading'],
  })
  @IsArray()
  @IsOptional()
  hobby: string[];
}

export const createAccountFields = [
  'username',
  'email',
  'phoneNumber',
  'skillsets',
  'hobby',
];

export const newAccountFields = createAccountFields.concat(['id', 'createAt']);
