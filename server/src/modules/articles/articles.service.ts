import Container, { Inject, Service, Token } from 'typedi';
import Logger from '@/core/logger';
import { throwErr, toOutPut, toPagingOutput } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import AuthSessionModel from '@/modules/auth/authSession.model';
import AuthService from '../auth/auth.service';
import { $toObjectId, $pagination, $toMongoFilter, $queryByList, $keysToProject } from '@/utils/mongoDB';
import { NewsError, newsModelToken, newsErrors, _news } from '.';
import { BaseServiceInput, BaseServiceOutput, PRIVATE_KEYS } from '@/types/Common';
import { isNil, omit } from 'lodash';
import { ObjectId } from 'mongodb';
const TOKEN_NAME = '_newsService';
/**
 * A bridge allows another service access to the Model layer
 * @export NewsService
 * @class NewsService
 * @extends {BaseService}
 */
export const NewsServiceToken = new Token<NewsService>(TOKEN_NAME);
/**
 * @class NewsService
 * @extends BaseService
 * @description News Service for all news related operations
 */
@Service(NewsServiceToken)
export class NewsService {
  private logger = new Logger('NewsService');

  private model = Container.get(newsModelToken);

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private authService: AuthService;

  private error(msg: keyof typeof newsErrors) {
    return new NewsError(msg);
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
   * Create a new News
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async create({ _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { name, categories = [] } = _content;
      const value = await this.model.create(
        {
          name,
        },
        {
          ..._news,
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
   * @param _id
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async update({ _slug: slug, _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      await this.model.update($toMongoFilter({ slug }), {
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
   * Delete news
   * @param _id
   * @param {ObjectId} _subject
   * @returns {Promise<void>}
   */
  async delete({ _slug: slug, _subject }: BaseServiceInput): Promise<void> {
    try {
      await this.model.delete($toMongoFilter({ slug }), {
        ...(_subject && { deleted_by: new ObjectId(_subject) }),
      });
      this.logger.debug('delete_success', { slug });
      return;
    } catch (err) {
      this.logger.error('delete_error', err.message);
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
  async query({ _filter, _query, _permission }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { q, categories = [] } = _filter;
      const { page = 1, per_page = 10, sort_by, sort_order } = _query;
      const [{ total_count } = { total_count: 0 }, ...items] = await this.model
        .get(
          $pagination({
            $match: {
              deleted: false,
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
            $addFields: { ...this.model.$addFields.categories, ...this.model.$addFields.images },
            $lookups: [
              this.model.$lookups.categories,
              this.model.$lookups.author,
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
        keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('query_error', err.message);
      throw err;
    }
  }
  /**
   * Get News by ID
   * @param id - News ID
   * @returns { Promise<BaseServiceOutput> } - News
   */
  async getById({ _slug: slug, _filter, _permission = 'public' }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const [item] = await this.model
        .get([
          {
            $match: {
              ...$toMongoFilter({
                slug,
              }),
            },
          },
          {
            $addFields: { ...this.model.$addFields.categories, ...this.model.$addFields.images },
          },
          this.model.$lookups.categories,
          this.model.$lookups.author,
          this.model.$sets.author,
          this.model.$lookups.upload_files(),
          this.model.$lookups.upload_files({
            refTo: 'images',
            reName: 'images',
            operation: '$in',
          }),
          this.model.$sets.image,
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
   * Get News by slug
   * @param id - News ID
   * @returns { Promise<BaseServiceOutput> } - News
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
            $addFields: { ...this.model.$addFields.categories, ...this.model.$addFields.images },
          },
          this.model.$lookups.categories,
          this.model.$lookups.author,
          this.model.$sets.author,
          this.model.$lookups.upload_files(),
          this.model.$lookups.upload_files({
            refTo: 'images',
            reName: 'images',
            operation: '$in',
          }),
          this.model.$sets.image,
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
              deleted: false,
              ...(q && {
                $or: [
                  { $text: { $search: q } },
                  {
                    name: { $regex: q, $options: 'i' },
                  },
                ],
              }),
            },
            $addFields: { ...this.model.$addFields.categories, ...this.model.$addFields.images },
            $lookups: [
              this.model.$lookups.categories,
              this.model.$lookups.author,
              this.model.$lookups.upload_files({
                refTo: 'images',
                reName: 'images',
                operation: '$in',
              }),
            ],
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
      //todo: check if user already react
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
        keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
  async upVote({ _subject, _slug: slug }: BaseServiceInput) {
    try {
      const { up_votes, down_votes } = await this.model.update($toMongoFilter({ slug }), {
        $addToSet: { up_votes: _subject },
        $pull: { down_votes: _subject },
      });
      this.logger.debug('update_success', {});
      return toOutPut({
        item: { up_votes, down_votes },
        keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
  async downVote({ _subject, _slug: slug }: BaseServiceInput) {
    try {
      //ToDO: check if user already up vote

      const { down_votes, up_votes } = await this.model.update($toMongoFilter({ slug }), {
        $addToSet: { down_votes: _subject },
        $pull: { up_votes: _subject },
      });
      this.logger.debug('update_success', {});
      return toOutPut({
        item: { down_votes, up_votes },
        keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
  async top({ _query }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { per_page = 10 } = _query;
      const items = await this.model
        .get([
          { $addFields: { votes: { $subtract: [{ $size: '$up_votes' }, { $size: '$down_votes' }] } } },
          { $sort: { votes: -1 } },
          {
            $limit: per_page,
          },
          this.model.$lookups.author,
        ])
        .toArray();
      this.logger.debug('query_success', { items });
      return toPagingOutput({ items, total_count: per_page });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
  async hot({ _query }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { per_page = 10 } = _query;
      const items = await this.model
        .get([
          { $sort: { views: -1 } },
          {
            $limit: per_page,
          },
          this.model.$lookups.author,
        ])
        .toArray();
      this.logger.debug('query_success', { items });
      return toPagingOutput({ items, total_count: 10 });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
}
