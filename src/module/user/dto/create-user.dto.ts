export class CreateUserDto {
  username: string;
  email: string;
  phoneNumber: string;
  skillsets: string[];
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
