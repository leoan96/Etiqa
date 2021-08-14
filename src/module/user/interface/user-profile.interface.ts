import { UserMainDetails } from './user-main-details.interface';

export interface UserProfile extends UserMainDetails {
  id?: string;
  createdAt: Date;
  updatedAt?: Date;
}
