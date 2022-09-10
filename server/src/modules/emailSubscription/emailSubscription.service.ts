import { Inject, Service } from 'typedi';
import Logger from '@/core/logger';
import RequestService from '@/modules/request/request.service';
import EmailSubscriptionModel from '@/modules/emailSubscription/emailSubscription.model';
import { withMongoTransaction } from '@/utils/mongoDB';
import { Filter } from 'mongodb';
import { EmailSubscription, EmailSubscriptionPayload } from '@/modules/emailSubscription/emailSubscription.type';
import { toEmailSubscriptionOutput } from '@/modules/emailSubscription/emailSubscription.util';
import { UserService } from '@/modules/user/user.service';
import { throwErr } from '@/utils/common';
import { UserError } from '@/modules/user/user.error';
import { alphabetSize12 } from '@/utils/randomString';

@Service()
export default class EmailSubscriptionService {
  private logger = new Logger('EmailSubscriptionService');

  @Inject()
  private emailSubscriptionModel: EmailSubscriptionModel;

  @Inject()
  private requestService: RequestService;

  @Inject()
  private userService: UserService;

  /**
   * A bridge allows another service access to the Model layer
   */
  get collection() {
    return this.emailSubscriptionModel.collection;
  }

  /**
   * Get a list of subscriptions by email
   */
  async filter(filter: Filter<EmailSubscription>) {
    try {
      const emailSubscriptions = await this.emailSubscriptionModel.collection.find(filter).toArray();
      this.logger.debug('[filter:success]', { filter });
      return emailSubscriptions.map((sub) => toEmailSubscriptionOutput(sub));
    } catch (err) {
      this.logger.error('[filter:error]', err);
      throw err;
    }
  }

  /**
   * Subscribe an email to a list of categories
   */
  async subscribe(email: string, categories: string[] = []) {
    try {
      await withMongoTransaction(async (session) => {
        await Promise.all(
          categories.map((categoryId) =>
            this.emailSubscriptionModel.collection.findOneAndUpdate(
              { email, category_id: categoryId },
              { $set: { status: 'SUBSCRIBED' } },
              { session, upsert: true, returnDocument: 'after' },
            ),
          ),
        );
      });
      this.logger.debug('[subscribe:success]', { email, categories });
    } catch (err) {
      this.logger.error('[subscribe:error]', err);
      throw err;
    }
  }

  /**
   * Unsubscribe an email from a list of categories
   */
  async unsubscribe(email: string, categories: string[] = []) {
    try {
      await withMongoTransaction(async (session) => {
        await Promise.all(
          categories.map((categoryId) =>
            this.emailSubscriptionModel.collection.findOneAndUpdate(
              { email, category_id: categoryId },
              { $set: { status: 'UNSUBSCRIBED' } },
              { session, returnDocument: 'after' },
            ),
          ),
        );
      });
      this.logger.debug('[unsubscribe:success]', { email, categories });
    } catch (err) {
      this.logger.error('[unsubscribe:error]', err);
      throw err;
    }
  }

  /**
   * Get email subscription
   */
  async getEmailSubscription(userId: string): Promise<EmailSubscriptionPayload> {
    try {
      const user = await this.userService.getById(userId);
      const subscriptions = await this.emailSubscriptionModel.collection.find({ email: user.email }).toArray();
      const subscribedCategories = subscriptions.map((sub) => sub.category_id);
      this.logger.debug('[getEmailSubscription:success]', { userId, subscribedCategories });
      return {
        email: user.email,
        subscribed: user.subscribed_email_subscription || false,
        categories: subscribedCategories,
      };
    } catch (err) {
      this.logger.error('[getEmailSubscription:error]', err);
      throw err;
    }
  }

  /**
   * Update email subscription
   */
  async updateEmailSubscription(userId: string, payload: Omit<EmailSubscriptionPayload, 'email'>) {
    try {
      await withMongoTransaction(async (session) => {
        // Update user settings
        const { value: user } = await this.userService.collection.findOneAndUpdate(
          { id: userId },
          { $set: { subscribed_email_subscription: payload.subscribed, updated_at: new Date() } },
          { session },
        );
        if (!user) throwErr(new UserError('USER_NOT_FOUND'));
        // Remove current subscriptions
        await this.emailSubscriptionModel.collection.deleteMany({ email: user.email }, { session });
        // Add new subscriptions
        await Promise.all(
          payload.categories.map(async (categoryId) =>
            this.emailSubscriptionModel.collection.insertOne(
              {
                id: await alphabetSize12(),
                email: user.email,
                category_id: categoryId,
                status: payload.subscribed ? 'SUBSCRIBED' : 'UNSUBSCRIBED',
              },
              { session },
            ),
          ),
        );
      });
      this.logger.debug('[updateEmailSubscription:success]', { userId, payload });
      return payload;
    } catch (err) {
      this.logger.error('[updateEmailSubscription:error]', err);
      throw err;
    }
  }
}
