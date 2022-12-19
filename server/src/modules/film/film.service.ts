import Container, { Inject, Service, Token } from 'typedi';
import Logger from '@/core/logger';
import { throwErr, toOutPut, toPagingOutput } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import AuthSessionModel from '@/modules/auth/authSession.model';
import AuthService from '../auth/auth.service';
import { $toObjectId, $pagination, $toMongoFilter, $queryByList, $keysToProject, $lookup } from '@/utils/mongoDB';
import { FilmError, FilmModelToken, FilmErrors, _Film } from '.';
import { BaseServiceInput, BaseServiceOutput, PRIVATE_KEYS } from '@/types/Common';
import { isNil, omit } from 'lodash';
import { ObjectId } from 'mongodb';
const TOKEN_NAME = '_FilmService';
/**
 * A bridge allows another service access to the Model layer
 * @export FilmService
 * @class FilmService
 * @extends {BaseService}
 */
export const FilmServiceToken = new Token<FilmService>(TOKEN_NAME);
/**
 * @class FilmService
 * @extends BaseService
 * @description Film Service for all Film related operations
 */
@Service(FilmServiceToken)
export class FilmService {
  private logger = new Logger('FilmService');

  private model = Container.get(FilmModelToken);

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private authService: AuthService;

  private error(msg: keyof typeof FilmErrors) {
    return new FilmError(msg);
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
   * Create a new Film
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
          ..._Film,
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
   * Delete Film
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
   *  Query Film
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
                      $in: Array.isArray(categories) ? $toObjectId(categories) : [$toObjectId(categories)],
                    },
                  },
                ],
              }),
            },
            $sets: [
              this.model.$sets.author,
              this.model.$sets.image,
              {
                $set: {
                  video: { $first: '$video' },
                },
              },
            ],
            $addFields: {
              ...this.model.$addFields.categories,
              ...this.model.$addFields.images,
              ...this.model.$addFields.comments,
            },
            $lookups: [
              this.model.$lookups.categories,
              this.model.$lookups.author,
              this.model.$lookups.upload_files(),
              this.model.$lookups.comments,
              this.model.$lookups.upload_files({
                refTo: 'images',
                reName: 'images',
                operation: '$in',
              }),
              $lookup({
                from: 'upload_file',
                refFrom: '_id',
                refTo: 'video',
                select: 'name url',
                reName: 'video',
                operation: '$eq',
              }),
            ],
            ...(sort_by && sort_order && { $sort: { [sort_by]: sort_order == 'asc' ? 1 : -1 } }),
            ...(per_page && page && { items: [{ $skip: +per_page * (+page - 1) }, { $limit: +per_page }] }),
          }),
        )
        .toArray();
      this.logger.debug('query_success', { total_count, items });
      return toPagingOutput({
        items,
        total_count,
        // keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('query_error', err.message);
      throw err;
    }
  }
  /**
   * Get Film by ID
   * @param id - Film ID
   * @returns { Promise<BaseServiceOutput> } - Film
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
            $addFields: {
              ...this.model.$addFields.categories,
              ...this.model.$addFields.images,
              ...this.model.$addFields.comments,
            },
          },
          this.model.$lookups.categories,
          this.model.$lookups.author,
          this.model.$lookups.comments,
          this.model.$lookups.upload_files(),
          this.model.$lookups.upload_files({
            refTo: 'images',
            reName: 'images',
            operation: '$in',
          }),
          $lookup({
            from: 'upload_file',
            refFrom: '_id',
            refTo: 'video',
            select: 'name url',
            reName: 'video',
            operation: '$eq',
          }),
          {
            $set: {
              video: { $first: '$video' },
            },
          },
          this.model.$sets.image,
          this.model.$sets.author,
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
   * Get Film by slug
   * @param id - Film ID
   * @returns { Promise<BaseServiceOutput> } - Film
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
          this.model.$lookups.author,
          this.model.$sets.author,
          this.model.$lookups.comments,
          this.model.$lookups.upload_files(),
          this.model.$lookups.upload_files({
            refTo: 'images',
            reName: 'images',
            operation: '$in',
          }),
          $lookup({
            from: 'upload_file',
            refFrom: '_id',
            refTo: 'video',
            select: 'name url',
            reName: 'video',
            operation: '$eq',
          }),
          {
            $set: {
              video: { $first: '$video' },
            },
          },
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
            $sets: [
              this.model.$sets.author,
              this.model.$sets.image,
              {
                $set: {
                  video: { $first: '$video' },
                },
              },
            ],
            $lookups: [
              this.model.$lookups.comments,
              this.model.$lookups.categories,
              this.model.$lookups.author,
              this.model.$lookups.upload_files(),
              this.model.$lookups.upload_files({
                refTo: 'images',
                reName: 'images',
                operation: '$in',
              }),
              $lookup({
                from: 'upload_file',
                refFrom: '_id',
                refTo: 'video',
                select: 'name url',
                reName: 'video',
                operation: '$eq',
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
