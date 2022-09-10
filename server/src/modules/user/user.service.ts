import { Inject, Service } from 'typedi';
import Logger from '@/core/logger';
import { throwErr } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import { AuthError } from '@/modules/auth/auth.error';
import { SystemError } from '@/core/errors/CommonError';
import { UserModel } from './user.model';
import { CreateUpdateUserInput, User, UserOutput } from './user.type';
import { toUserOutput } from './user.util';
import { UserError } from '@/modules/user/user.error';
import { DEFAULT_USER_PICTURE } from '@/config/constants';
import { Filter, ObjectId } from 'mongodb';
import { BaseQuery, PaginationResult } from '@/types/Common';
import { $queryByList, withMongoTransaction } from '@/utils/mongoDB';
import AuthSessionModel from '@/modules/auth/authSession.model';
import EmailSubscriptionModel from '@/modules/emailSubscription/emailSubscription.model';
import VerificationTokenModel from '@/modules/verificationToken/verificationToken.model';
import BlocklistService from '@/modules/auth/blocklist.service';
import { generateTextAlias } from '@/utils/text';

@Service()
export class UserService {
  private logger = new Logger('UserService');

  @Inject()
  private userModel: UserModel;

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private emailSubscriptionModel: EmailSubscriptionModel;

  @Inject()
  private verificationTokenModel: VerificationTokenModel;

  @Inject()
  private blocklistService: BlocklistService;

  /**
   * A bridge allows another service access to the Model layer
   */
  get collection() {
    return this.userModel.collection;
  }

  /**
   * Generate user ID
   */
  static async generateID() {
    return alphabetSize12();
  }

  /**
   * Query users
   */
  async query(filter: Filter<User> & { q?: string }, query: BaseQuery): Promise<PaginationResult<UserOutput>> {
    try {
      const { q, ...match } = filter;
      const [
        {
          total_count: [{ count } = { count: 0 }],
          items,
        },
      ] = (await this.userModel.collection
        .aggregate([
          {
            $match: {
              ...match,
              ...(q && {
                $or: [
                  { _full_name_alias: { $regex: q, $options: 'i' } },
                  { phone: { $regex: q, $options: 'i' } },
                  { email: { $regex: q, $options: 'i' } },
                ],
              }),
            },
          },
          { $sort: { [query.sort_by]: query.sort_order === 'asc' ? 1 : -1 } },
          {
            $facet: {
              total_count: [{ $count: 'count' }],
              items: [{ $skip: query.per_page * (query.page - 1) }, { $limit: query.per_page }],
            },
          },
        ])
        .toArray()) as any;
      this.logger.debug('[query:success]', { filter, query });
      return {
        total_count: count,
        items: items.map((item: User) => toUserOutput(item)),
      };
    } catch (err) {
      this.logger.error('[query:error]', err.message);
      throw err;
    }
  }

  /**
   * Create a user
   */
  async create(userInput: CreateUpdateUserInput) {
    try {
      // Check duplicated
      const isDuplicated = !!(await this.userModel.collection.countDocuments({ email: userInput.email }));
      if (isDuplicated) throwErr(new AuthError('EMAIL_ALREADY_EXISTS'));
      // Create user
      const now = new Date();
      const user: User = {
        ...userInput,
        // _full_name_alias: generateTextAlias(userInput.full_name),
        picture: userInput.picture || DEFAULT_USER_PICTURE, // Should set a default avatar picture
        id: await UserService.generateID(),
        email_verified: false,
        roles: ['user'],
        status: 'active',
        created_at: now,
        updated_at: now,
      };
      // Insert user to database
      const { acknowledged } = await this.userModel.collection.insertOne(user);
      if (!acknowledged) {
        throwErr(new SystemError(`MongoDB insertOne() failed! Payload: ${JSON.stringify(user)}`));
      }
      this.logger.debug('[create:success]', { email: userInput.email });
      return toUserOutput(user);
    } catch (err) {
      this.logger.error('[create:error]', err.message);
      throw err;
    }
  }

  /**
   * Get user by ID
   */
  async getById(id: User['id']) {
    try {
      const user = await this.userModel.collection.findOne({ id });
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[getById:success]', { id, email: user.email });
      return toUserOutput(user);
    } catch (err) {
      this.logger.error('[getById:error]', err.message);
      throw err;
    }
  }

  /**
   * Update user
   */
  async update(id: User['id'], data: Partial<User>) {
    try {
      const { value: user } = await this.userModel.collection.findOneAndUpdate(
        { id },
        {
          $set: {
            ...data,
            ...(data.full_name && { _full_name_alias: generateTextAlias(data.full_name) }),
            updated_at: new Date(),
          },
        },
        { returnDocument: 'after' },
      );
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[update:success]', { email: user.email });
      return toUserOutput(user);
    } catch (err) {
      this.logger.error('[update:error]', err.message);
      if (err.code === 11000 && err.keyPattern?.email) throwErr(new AuthError('EMAIL_ALREADY_EXISTS'));
      throw err;
    }
  }

  /**
   * Suspend user account
   */
  async suspend(userId: string) {
    try {
      // Suspend user
      await this.update(userId, { status: 'suspended' });
      // Block current auth sessions
      await this.blocklistService.addToTemporaryBlockList(userId);
      this.logger.debug('[suspend:success]', { userId });
    } catch (err) {
      this.logger.error('[suspend:error]', err);
      throw err;
    }
  }

  /**
   * Unsuspend user account
   */
  async unsuspend(userId: string) {
    try {
      // Unsuspend user
      await this.update(userId, { status: 'active' });
      // Enable blocked auth sessions
      await this.blocklistService.removeFromTemporaryBlockList(userId);
      this.logger.debug('[unsuspend:success]', { userId });
    } catch (err) {
      this.logger.error('[unsuspend:error]', err);
      throw err;
    }
  }

  /**
   * Delete user account
   */
  async deleteUserAccount(userId: string) {
    try {
      await withMongoTransaction(async (session) => {
        // Delete user
        const { value: user } = await this.userModel.collection.findOneAndDelete({ id: userId }, { session });
        if (!user) throwErr(new UserError('USER_NOT_FOUND'));
        if (user.roles.includes('admin')) throwErr(new UserError('CANNOT_DELETE_ADMIN_ACCOUNT'));
        // Delete other parts
        await Promise.all([
          // Delete auth sessions
          this.authSessionModel.collection.deleteMany({ user_id: user.id }, { session }),
          // Delete email subscriptions
          this.emailSubscriptionModel.collection.deleteMany({ email: user.email }, { session }),
          // Delete verification tokens
          this.verificationTokenModel.collection.deleteMany({ email: user.email }, { session }),
        ]);
      });
      // Block current auth sessions
      await this.blocklistService.addToTemporaryBlockList(userId);
      this.logger.debug('[deleteAccount:success]', { userId });
    } catch (err) {
      this.logger.error('[deleteAccount:error]', err);
      throw err;
    }
  }
  async updateFavoriteNews(userId: string, newsId: string) {
    try {
      if (!(await $queryByList({ collection: 'news', values: [newsId] }))) {
        throwErr(new SystemError(`News not found!`));
      }
      const { value: user } = await this.userModel.collection.findOneAndUpdate(
        { id: userId },
        {
          $addToSet: { favorite_news: newsId },
        },
        { returnDocument: 'after' },
      );
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[updateFavoriteNews:success]', { userId, newsId });
      return toUserOutput({ favorite_news: user.favorite_news } as User);
    } catch (err) {
      this.logger.error('[addNews:error]', err);
      throw err;
    }
  }
  async saveNews(userId: string, newsId: string) {
    try {
      if (!(await $queryByList({ collection: 'news', values: [newsId] }))) {
        throwErr(new SystemError(`News not found!`));
      }
      const { value: user } = await this.userModel.collection.findOneAndUpdate(
        { id: userId },
        {
          $addToSet: { saved_news: newsId },
        },
        { returnDocument: 'after' },
      );
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[saveNews:success]', { userId, newsId });
      return toUserOutput({ saved_news: user.saved_news } as User);
    } catch (err) {
      this.logger.error('[addNews:error]', err);
      throw err;
    }
  }
  async followCategory(id: string, categoryId: string) {
    try {
      if (!(await $queryByList({ collection: 'categories', values: [categoryId] }))) {
        throwErr(new SystemError(`Categories not found!`));
      }
      const {
        value: user,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this.userModel.collection.findOneAndUpdate(
        { id },
        {
          $set: {
            updated_at: new Date(),
          },
          $addToSet: {
            followings: new ObjectId(categoryId),
          },
        },
        { returnDocument: 'after' },
      );
      if (!updatedExisting) throwErr(new UserError('USER_NOT_FOUND'));
      if (!ok)
        throwErr(new SystemError(`MongoDB findOneAndUpdate() failed! Payload: ${JSON.stringify({ id, categoryId })}`));
      this.logger.debug('[update:success]', { email: user.email });
      return {
        followings: user.followings,
      };
    } catch (err) {
      this.logger.error('[update:error]', err.message);
      throw err;
    }
  }
  async unfollowCategory(id: string, categoryId: string) {
    try {
      const {
        value: user,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this.userModel.collection.findOneAndUpdate(
        { id },
        {
          $set: {
            updated_at: new Date(),
          },
          $pull: {
            followings: new ObjectId(categoryId),
          },
        },
        { returnDocument: 'after' },
      );
      if (!updatedExisting) throwErr(new UserError('USER_NOT_FOUND'));
      if (!ok)
        throwErr(new SystemError(`MongoDB findOneAndUpdate() failed! Payload: ${JSON.stringify({ id, categoryId })}`));
      this.logger.debug('[update:success]', { email: user.email });
      return {
        followings: user.followings,
      };
    } catch (err) {
      this.logger.error('[update:error]', err.message);
      throw err;
    }
  }
  async push(id: any, ...data: any) {
    try {
      const {
        value: user,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this.userModel.collection.findOneAndUpdate(
        { id },
        {
          $set: {
            updated_at: new Date(),
          },
          $addToSet: {
            ...data,
          },
        },
        { returnDocument: 'after' },
      );
      if (!updatedExisting) throwErr(new UserError('USER_NOT_FOUND'));
      if (!ok) throwErr(new SystemError(`MongoDB findOneAndUpdate() failed! Payload: ${JSON.stringify({ id, data })}`));
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[update:success]', { email: user.email });
      return toUserOutput(user);
    } catch (err) {
      this.logger.error('[update:error]', err.message);
      throw err;
    }
  }
  async pull(id: any, ...data: any) {
    try {
      const {
        value: user,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this.userModel.collection.findOneAndUpdate(
        { id },
        {
          $set: {
            updated_at: new Date(),
          },
          $pull: {
            ...data,
          },
        },
        { returnDocument: 'after' },
      );
      if (!updatedExisting) throwErr(new UserError('USER_NOT_FOUND'));
      if (!ok) throwErr(new SystemError(`MongoDB findOneAndUpdate() failed! Payload: ${JSON.stringify({ id, data })}`));
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[update:success]', { email: user.email });
      return toUserOutput(user);
    } catch (err) {
      this.logger.error('[update:error]', err.message);
      throw err;
    }
  }
}
