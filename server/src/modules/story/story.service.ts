import Container, { Inject, Service, Token } from 'typedi';
import Logger from '@/core/logger';
import { throwErr, toOutPut, toPagingOutput } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import AuthSessionModel from '@/modules/auth/authSession.model';
import AuthService from '../auth/auth.service';
import { $toObjectId, $pagination, $toMongoFilter, $queryByList, $keysToProject } from '@/utils/mongoDB';
import { StoryError, storyModelToken, storyErrors, _story } from '.';
import { BaseServiceInput, BaseServiceOutput, PRIVATE_KEYS } from '@/types/Common';
import { isNil, omit } from 'lodash';
import { ObjectId } from 'mongodb';
import { userModelToken } from '../user';
const TOKEN_NAME = '_storyService';
/**
 * A bridge allows another service access to the Model layer
 * @export StoryService
 * @class StoryService
 * @extends {BaseService}
 */
export const StoryServiceToken = new Token<StoryService>(TOKEN_NAME);
/**
 * @class StoryService
 * @extends BaseService
 * @description Story Service for all story related operations
 */
@Service(StoryServiceToken)
export class StoryService {
  private logger = new Logger('StoryService');

  private model = Container.get(storyModelToken);

  private userModel = Container.get(userModelToken);

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private authService: AuthService;

  private error(msg: keyof typeof storyErrors) {
    return new StoryError(msg);
  }

  get outputKeys() {
    return this.model._keys;
  }

  /**
   * Generate ID
   */
  static async generateID() {
    return alphabetSize12();
  }
  /**
   * Create a new Story
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async create({ _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { name, categories = [] } = _content;
      const value = await this.model.create(
        {
          // name,
        },
        {
          ..._story,
          ..._content,
          categories,
          ...(_subject && { author: new ObjectId(_subject) }),
        },
      );
      this.logger.debug('create_success', { _content });
      return toOutPut({ item: value });
    } catch (err) {
      this.logger.error('create_error', err.message);
      throw err;
    }
  }

  /**
   * Update category
   * @param _slug
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async update({ _slug, _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      await this.model.update($toMongoFilter({ slug: _slug }), {
        $set: {
          ..._content,
          ...(_subject && { updated_by: new ObjectId(_subject) }),
        },
      });
      this.logger.debug('update_success', { _content });
      return toOutPut({ item: _content });
    } catch (err) {
      this.logger.error('update_error', err.message);
      throw err;
    }
  }

  /**
   * Delete story
   * @param _id
   * @param {ObjectId} _subject
   * @returns {Promise<void>}
   */
  async delete({ _slug, _subject }: BaseServiceInput): Promise<void> {
    try {
      await this.model.delete($toMongoFilter({ slug: _slug }), {
        ...(_subject && { deleted_by: new ObjectId(_subject) }),
      });
      this.logger.debug('delete_success', { _slug });
      return;
    } catch (err) {
      this.logger.error('delete_error', err.message);
      throw err;
    }
  }

  /**
   *  Query story
   * @param {any} _filter
   * @param {BaseQuery} _query
   * @returns {Promise<BaseServiceOutput>}
   *
   **/
  async query({ _filter, _query, _permission }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { q, categories = [] } = _filter;
      const { page = 1, per_page = 10, sort_by, sort_order } = _query;
      const [{ total_count } = { total_count: 0 }, ...items] = await this.model
        .get(
          $pagination({
            $match: {
              deleted: {
                $ne: true,
              },
              ...(q && {
                name: { $regex: q, $options: 'i' },
              }),
              ...(categories.length && {
                $or: [
                  {
                    categories: {
                      $in: $toObjectId(categories),
                    },
                  },
                ],
              }),
            },
            $addFields: {
              ...this.model.$addFields.categories,
              ...this.model.$addFields.images,
              ...this.model.$addFields.comments,
            },
            $lookups: [
              this.model.$lookups.categories,
              this.model.$lookups.author,
              this.model.$lookups.comments,
              this.model.$lookups.upload_files({
                refTo: 'images',
                reName: 'images',
                operation: '$in',
              }),
            ],
            $sets: [this.model.$sets.author],
            ...(sort_by && sort_order && { $sort: { [sort_by]: sort_order == 'asc' ? 1 : -1 } }),
            ...(per_page && page && { items: [{ $skip: +per_page * (+page - 1) }, { $limit: +per_page }] }),
          }),
        )
        .toArray();
      this.logger.debug('query_success', { total_count, items });
      return toPagingOutput({
        items,
        total_count,
        //  keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('query_error', err.message);
      throw err;
    }
  }

  /**
   *  Query news
   * @param {any} _filter
   * @param {BaseQuery} _query
   * @returns {Promise<BaseServiceOutput>}
   *
   **/
  async queryFollowing({ _filter, _query, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { q, categories = [] } = _filter;
      const { page = 1, per_page = 10, sort_by, sort_order } = _query;
      let following = [];
      if (_subject) {
        const { following: _following = [] } = await this.userModel._collection.findOne({
          _id: new ObjectId(_subject),
        });
        following = _following;
      }
      const [{ total_count } = { total_count: 0 }, ...items] = await this.model
        .get(
          $pagination({
            $match: {
              deleted: {
                $ne: true,
              },
              ...(q && {
                name: { $regex: q, $options: 'i' },
              }),
              ...(categories.length && {
                $or: [
                  {
                    categories: {
                      $in: $toObjectId(categories),
                    },
                  },
                ],
              }),
              ...(following.length && {
                author: {
                  $in: $toObjectId(following),
                },
              }),
            },
            $addFields: {
              ...this.model.$addFields.categories,
              ...this.model.$addFields.images,
              ...this.model.$addFields.comments,
            },
            $lookups: [
              this.model.$lookups.categories,
              this.model.$lookups.author,
              this.model.$lookups.comments,
              this.model.$lookups.upload_files(),
              this.model.$lookups.upload_files({
                refTo: 'images',
                reName: 'images',
                operation: '$in',
              }),
            ],
            $sets: [this.model.$sets.author],
            ...(sort_by && sort_order && { $sort: { [sort_by]: sort_order == 'asc' ? 1 : -1 } }),
            ...(per_page && page && { items: [{ $skip: +per_page * (+page - 1) }, { $limit: +per_page }] }),
          }),
        )
        .toArray();
      this.logger.debug('query_success', { total_count, items });
      return toPagingOutput({
        items,
        total_count,
        //  keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('query_error', err.message);
      throw err;
    }
  }
  /**
   * Get Story by ID
   * @param id - Story ID
   * @returns { Promise<BaseServiceOutput> } - Story
   */
  async getById({ _slug, _filter, _permission = 'public' }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const [item] = await this.model
        .get([
          {
            $match: {
              ...$toMongoFilter({
                slug: _slug,
              }),
            },
          },
          {
            $addFields: {
              ...this.model.$addFields.categories,
              ...this.model.$addFields.images,
              ...this.model.$addFields.comments,
            },
          },
          this.model.$lookups.categories,
          this.model.$lookups.author,
          this.model.$sets.author,
          this.model.$lookups.comments,
          this.model.$lookups.upload_files(),
          this.model.$sets.image,
          this.model.$lookups.upload_files({
            refTo: 'images',
            reName: 'images',
            operation: '$in',
          }),
          {
            $limit: 1,
          },
        ])
        .toArray();
      if (isNil(item)) throwErr(this.error('NOT_FOUND'));
      this.logger.debug('get_success', { item });
      return toOutPut({ item });
    } catch (err) {
      this.logger.error('get_error', err.message);
      throw err;
    }
  }
  /**
   * Get Story by slug
   * @param id - Story ID
   * @returns { Promise<BaseServiceOutput> } - Story
   */
  async getBySlug({ _slug, _filter, _permission = 'public' }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const [item] = await this.model
        .get([
          {
            $match: {
              ...$toMongoFilter({ slug: _slug }),
            },
          },
          {
            $addFields: {
              ...this.model.$addFields.categories,
              ...this.model.$addFields.images,
              ...this.model.$addFields.comments,
            },
          },
          this.model.$lookups.categories,
          this.model.$lookups.comments,

          this.model.$lookups.author,
          this.model.$sets.author,
          this.model.$lookups.upload_files(),
          this.model.$sets.image,
          this.model.$lookups.upload_files({
            refTo: 'images',
            reName: 'images',
            operation: '$in',
          }),
          {
            $limit: 1,
          },
        ])
        .toArray();
      if (isNil(item)) throwErr(this.error('NOT_FOUND'));
      this.logger.debug('get_success', { item });
      return toOutPut({ item });
    } catch (err) {
      this.logger.error('get_error', err.message);
      throw err;
    }
  }
  /**
   * Search by text index
   * @param {BaseServiceInput} _filter _query
   * @returns
   */
  async search({ _filter, _query }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { q, lang } = _filter;
      const { page = 1, per_page = 10, sort_by, sort_order } = _query;
      const [{ total_count } = { total_count: 0 }, ...items] = await this.model
        .get([
          ...$pagination({
            $match: {
              deleted: {
                $ne: true,
              },
              ...(q && {
                $or: [
                  { $text: { $search: q } },
                  {
                    name: { $regex: q, $options: 'i' },
                  },
                ],
              }),
            },
            $addFields: {
              ...this.model.$addFields.categories,
              ...this.model.$addFields.images,
              ...this.model.$addFields.comments,
            },
            $lookups: [this.model.$lookups.categories, this.model.$lookups.comments],
            ...(per_page && page && { items: [{ $skip: +per_page * (+page - 1) }, { $limit: +per_page }] }),
          }),
        ])
        .toArray();
      this.logger.debug('query_success', { total_count, items });
      return toPagingOutput({ items, total_count });
    } catch (err) {
      this.logger.error('query_error', err.message);
      throw err;
    }
  }
  async react({ _subject, _slug: slug }: BaseServiceInput) {
    try {
      // TODO: check if user already react
      const [item] = await this.model
        .get([
          {
            $match: {
              slug,
              reacts: {
                $in: [new ObjectId(_subject)],
              },
            },
          },
        ])
        .toArray();
      const { reacts } = item
        ? await this.model.update(
            { slug },
            {
              $pull: { reacts: new ObjectId(_subject) },
            },
          )
        : await this.model.update(
            { slug },
            {
              $addToSet: { reacts: new ObjectId(_subject) },
            },
          );
      this.logger.debug('update_success', {});
      return toOutPut({
        item: { reacts },
        //  keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
}
