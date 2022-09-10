import { WithId } from 'mongodb';
import { omit } from 'lodash';
import { EmailSubscription, EmailSubscriptionOutput } from '@/modules/emailSubscription/emailSubscription.type';

export const toEmailSubscriptionOutput = (
  item: EmailSubscription | WithId<EmailSubscription>,
): EmailSubscriptionOutput => {
  return omit(item, '_id');
};
