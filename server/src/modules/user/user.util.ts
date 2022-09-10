import { WithId } from 'mongodb';
import { omit, pick } from 'lodash';
import { User, UserOutput, UserPublicResponse } from '@/modules/user/user.type';

export const toUserOutput = (item: User | WithId<User>): UserOutput | undefined => {
  if (!item) return undefined;
  return omit(item, '_id', 'password');
};

export const toUserPublicResponse = (item: UserOutput | WithId<UserOutput>): UserPublicResponse => {
  if (!item) return undefined;
  return pick(item, 'id', 'full_name', 'picture');
};
