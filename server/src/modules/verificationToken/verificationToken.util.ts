import { WithId } from 'mongodb';
import { omit } from 'lodash';
import { VerificationToken, VerificationTokenOutput } from './verificationToken.type';

export const toVerificationTokenOutput = (
  item: VerificationToken | WithId<VerificationToken>,
): VerificationTokenOutput => {
  return omit(item, '_id');
};
