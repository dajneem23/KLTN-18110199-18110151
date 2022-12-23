import Container, { Inject, Service } from 'typedi';
import Logger from '@/core/logger';
import { throwErr, toOutPut } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import { AuthError } from '@/modules/auth/auth.error';
import { SystemError } from '@/core/errors/CommonError';
import { UserModel, userModelToken } from './user.model';
import { CreateUpdateUserInput, User, UserOutput } from './user.type';
import { toUserOutput } from './user.util';
import { UserError } from '@/modules/user/user.error';
import { DEFAULT_USER_PICTURE } from '@/config/constants';
import { Filter, ObjectId } from 'mongodb';
import { BaseQuery, BaseServiceInput, COLLECTION_NAMES, PaginationResult } from '@/types/Common';
import { $lookup, $queryByList, withMongoTransaction } from '@/utils/mongoDB';
import AuthSessionModel from '@/modules/auth/authSession.model';
import VerificationTokenModel from '@/modules/verificationToken/verificationToken.model';
import BlocklistService from '@/modules/auth/blocklist.service';
import { generateTextAlias } from '@/utils/text';
import e from 'express';
import { Category } from '../category/category.type';
import { categoryModelToken } from '../category/category.model';

@Service()
export class UserService {
  private logger = new Logger('UserService');

  public model: UserModel = Container.get(userModelToken);

  public categoriesModel = Container.get(categoryModelToken);

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private verificationTokenModel: VerificationTokenModel;

  @Inject()
  private blocklistService: BlocklistService;

  /**
   * A bridge allows another service access to the Model layer
   */

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
      ] = (await this.model
        .get([
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
      const isDuplicated = !!(await this.model._collection.countDocuments({ email: userInput.email }));
      if (isDuplicated) throwErr(new AuthError('EMAIL_ALREADY_EXISTS'));
      // Create user
      const now = new Date();
      const user = {
        ...userInput,
        // _full_name_alias: generateTextAlias(userInput.full_name),
        avatar: userInput.avatar || new ObjectId('63a1a4a4a82a2a90e96f2b7c'), // Should set a default avatar picture
        id: await UserService.generateID(),
        email_verified: false,
        roles: ['user'],
        status: 'active',
        created_at: now,
        updated_at: now,
      };
      // Insert user to database
      const { acknowledged } = await this.model._collection.insertOne(user as any);
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
  async getById(_id: User['id']) {
    try {
      const [user] = await this.model._collection
        .aggregate([
          {
            $match: {
              _id: new ObjectId(_id),
            },
          },
          {
            $addFields: {
              ...this.model.$addFields.following,
            },
          },
          $lookup({
            from: COLLECTION_NAMES.upload_file,
            refFrom: '_id',
            refTo: 'avatar',
            select: 'name url size',
            reName: 'avatar',
            operation: '$eq',
          }),
          this.model.$lookups.following,
        ])
        .toArray();
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[getById:success]', { _id, email: user.email });
      return toUserOutput(user as any);
    } catch (err) {
      this.logger.error('[getById:error]', err.message);
      throw err;
    }
  }

  /**
   * Update user
   */
  async update(_id: User['id'], data: Partial<User>) {
    try {
      const { avatar, ...rest } = data;
      const user = await this.model.update(
        {
          _id: new ObjectId(_id),
        },
        {
          $set: {
            ...data,
            avatar: avatar ? new ObjectId(avatar) : undefined,
          },
        },
      );
      this.logger.debug('[update:success]', { email: user.email });
      return toUserOutput(user as any);
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
        const { value: user } = await this.model._collection.findOneAndDelete({ id: userId }, { session });
        if (!user) throwErr(new UserError('USER_NOT_FOUND'));
        if (user.roles.includes('admin')) throwErr(new UserError('CANNOT_DELETE_ADMIN_ACCOUNT'));
        // Delete other parts
        await Promise.all([
          // Delete auth sessions
          this.authSessionModel.collection.deleteMany({ user_id: user.id }, { session }),
          // Delete email subscriptions
          // this.emailSubscriptionModel.collection.deleteMany({ email: user.email }, { session }),
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

  async push(_id: any, ...data: any) {
    try {
      const {
        value: user,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this.model._collection.findOneAndUpdate(
        { _id: new ObjectId(_id) },
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
      if (!ok)
        throwErr(new SystemError(`MongoDB findOneAndUpdate() failed! Payload: ${JSON.stringify({ _id, data })}`));
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[update:success]', { email: user.email });
      return toOutPut({ item: user });
    } catch (err) {
      this.logger.error('[update:error]', err.message);
      throw err;
    }
  }
  async pull(_id: any, ...data: any) {
    try {
      const {
        value: user,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this.model._collection.findOneAndUpdate(
        { _id: new ObjectId(_id) },
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
      if (!ok)
        throwErr(new SystemError(`MongoDB findOneAndUpdate() failed! Payload: ${JSON.stringify({ _id, data })}`));
      if (!user) throwErr(new UserError('USER_NOT_FOUND'));
      this.logger.debug('[update:success]', { email: user.email });
      return toOutPut({ item: user });
    } catch (err) {
      this.logger.error('[update:error]', err.message);
      throw err;
    }
  }
  async followUser({ _subject, _id }: BaseServiceInput) {
    try {
      //todo: check if user exist
      const [userToFollow] = await this.model
        .get([
          {
            $match: { _id: new ObjectId(_id) },
          },
        ])
        .toArray();
      if (!userToFollow) throwErr(new UserError('USER_NOT_FOUND'));
      //todo: check if user already react
      const [item] = await this.model
        .get([
          {
            $match: {
              _id: new ObjectId(_subject),
              following: {
                $in: [new ObjectId(_id)],
              },
            },
          },
        ])
        .toArray();

      if (item) {
        const { following } = await this.model.update(
          { _id: new ObjectId(_subject) },
          {
            $pull: { following: new ObjectId(_id) },
          },
        );
        await this.model.update(
          { _id: new ObjectId(_id) },
          {
            $pull: { followers: new ObjectId(_subject) },
          },
        );
        return toOutPut({
          item: { following },
          //  keys: this.model._keys,
        });
      } else {
        const { following } = await this.model.update(
          { _id: new ObjectId(_subject) },
          {
            $addToSet: { following: new ObjectId(_id) },
          },
        );
        await this.model.update(
          { _id: new ObjectId(_id) },
          {
            $addToSet: { followers: new ObjectId(_subject) },
          },
        );
        return toOutPut({
          item: { following },
          //  keys: this.model._keys,
        });
      }
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }

  async followCategory({ _subject, _id }: BaseServiceInput) {
    try {
      //todo: check if user exist
      const [categoryToFollow] = await this.categoriesModel
        .get([
          {
            $match: { _id: new ObjectId(_id) },
          },
        ])
        .toArray();
      if (!categoryToFollow) throwErr(new UserError('CATEGORY_NOT_FOUND'));
      //todo: check if user already react
      const [item] = await this.model
        .get([
          {
            $match: {
              _id: new ObjectId(_subject),
              categories: {
                $in: [new ObjectId(_id)],
              },
            },
          },
        ])
        .toArray();
      if (item) {
        const { categories } = await this.model.update(
          { _id: new ObjectId(_subject) },
          {
            $pull: { categories: new ObjectId(_id) },
          },
        );
        await this.categoriesModel.update(
          { _id: new ObjectId(_id) },
          {
            $pull: { users: new ObjectId(_subject) },
          },
        );
        return toOutPut({
          item: { categories },
          //  keys: this.model._keys,
        });
      } else {
        const { categories } = await this.model.update(
          { _id: new ObjectId(_subject) },
          {
            $addToSet: { categories: new ObjectId(_id) },
          },
        );
        await this.categoriesModel.update(
          { _id: new ObjectId(_id) },
          {
            $addToSet: { users: new ObjectId(_subject) },
          },
        );
        return toOutPut({
          item: { categories },
          //  keys: this.model._keys,
        });
      }
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
}
