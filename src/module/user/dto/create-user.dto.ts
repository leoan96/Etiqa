import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 16)
  @IsOptional()
  username: string;

  @IsEmail()
  @MaxLength(50)
  @IsOptional()
  email: string;

  @IsString()
  @Length(11, 12)
  @IsOptional()
  phoneNumber: string;

  @IsArray()
  @IsOptional()
  skillsets: string[];

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
