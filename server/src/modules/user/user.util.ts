import { WithId } from 'mongodb';
import { omit, pick } from 'lodash';
import { User, UserOutput, UserPublicResponse } from '@/modules/user/user.type';

export const toUserOutput = (item: any): UserOutput | undefined => {
  if (!item) return undefined;
  return omit(item, 'password') as any;
};

export const toUserPublicResponse = (item: UserOutput | WithId<UserOutput>): UserPublicResponse => {
  if (!item) return undefined;
  return pick(item, '_id', 'name', 'avatar');
};
