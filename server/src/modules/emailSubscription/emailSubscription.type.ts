export interface EmailSubscription {
  id: string;
  email: string;
  category_id: string;
  status: 'SUBSCRIBED' | 'UNSUBSCRIBED';
}

export type EmailSubscriptionOutput = EmailSubscription;

export type EmailSubscriptionPayload = {
  email: string;
  subscribed: boolean;
  categories: string[];
};
