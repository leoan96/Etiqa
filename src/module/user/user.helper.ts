import { Model } from 'mongoose';
import { UserDocument } from '../schema/user.schema';

export const doesAccountExists = async (
  email: string,
  userModel: Model<UserDocument>,
) => {
  const account = await userModel.findOne({ email });
  return !!account;
};
