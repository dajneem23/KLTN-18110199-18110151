import {
  Collection,
  Db,
  IndexDirection,
  CreateIndexesOptions,
  FindOneAndUpdateOptions,
  AggregateOptions,
  AggregationCursor,
  WithId,
} from 'mongodb';
import Container from 'typedi';
import { DIMongoDB } from '@/loaders/mongoDBLoader';
import { DILogger } from '@/loaders/loggerLoader';
import Logger from '@/core/logger';
import { CommonError, errors } from '@/core/errors/CommonError';
import { throwErr } from '@/utils/common';
import { $lookup, $toMongoFilter, $toObjectId } from '@/utils/mongoDB';
import { $refValidation } from '@/utils/validation';
import { COLLECTION_NAMES, PRIVATE_KEYS, RemoveSlugPattern, T } from '@/types';
import slugify from 'slugify';
import { omit } from 'lodash';

/**
 * @class BaseModel
 * @description Base model for all models
 */
export class BaseModel {
  readonly _collection: Collection;

  readonly _collectionName: keyof typeof COLLECTION_NAMES;

  readonly _keys: (string | number | symbol)[];

  readonly _defaultFilter = {
    deleted: false,
  };
  readonly _defaultKeys = ['author', 'id'];
  // Get Db instance from DI
  private db: Db = Container.get(DIMongoDB) as Db;
  // Get logger Instance from DI
  private logger: Logger = Container.get(DILogger) as Logger;
  //init error
  private error(msg: keyof typeof errors, detail?: any[]): any {
    return new CommonError(msg, detail);
  }

  get $lookups(): {
    country: any;
    products: any;
    projects: any;
    categories: any;
    author: any;
    team: any;
    directors: any;
    cryptocurrencies: any;
    event_tags: any;
    person_tags: any;
    product_tags: any;
    company_tags: any;
    coin_tags: any;
    speakers: any;
    sub_categories: any;
  } {
    return {
      products: $lookup({
        from: 'products',
        refFrom: '_id',
        refTo: 'products',
        select: 'name',
        reName: 'products',
        operation: '$in',
      }),
      projects: $lookup({
        from: 'projects',
        refFrom: '_id',
        refTo: 'projects',
        select: 'name',
        reName: 'projects',
        operation: '$in',
      }),
      categories: $lookup({
        from: 'categories',
        refFrom: '_id',
        refTo: 'categories',
        select: 'title type',
        reName: 'categories',
        operation: '$in',
      }),
      author: $lookup({
        from: 'users',
        refFrom: 'id',
        refTo: 'created_by',
        select: 'full_name picture avatar',
        reName: 'author',
        operation: '$eq',
      }),
      team: $lookup({
        from: 'team',
        refFrom: '_id',
        refTo: 'team',
        select: 'name avatar',
        reName: 'team',
        operation: '$in',
      }),
      directors: $lookup({
        from: 'persons',
        refFrom: '_id',
        refTo: 'director',
        select: 'name avatar',
        reName: 'director',
        operation: '$eq',
      }),
      cryptocurrencies: $lookup({
        from: 'coins',
        refFrom: '_id',
        refTo: 'cryptocurrencies',
        select: 'name token_id',
        reName: 'cryptocurrencies',
        operation: '$in',
      }),
      country: $lookup({
        from: 'countries',
        refFrom: 'code',
        refTo: 'country',
        select: 'name',
        reName: 'country',
        operation: '$eq',
      }),
      coin_tags: $lookup({
        from: 'coins',
        refFrom: '_id',
        refTo: 'coin_tags',
        select: 'name',
        reName: 'coin_tags',
        operation: '$in',
      }),
      company_tags: $lookup({
        from: 'companies',
        refFrom: '_id',
        refTo: 'company_tags',
        select: 'name',
        reName: 'company_tags',
        operation: '$in',
      }),
      product_tags: $lookup({
        from: 'products',
        refFrom: '_id',
        refTo: 'product_tags',
        select: 'name',
        reName: 'product_tags',
        operation: '$in',
      }),
      person_tags: $lookup({
        from: 'persons',
        refFrom: '_id',
        refTo: 'person_tags',
        select: 'name',
        reName: 'person_tags',
        operation: '$in',
      }),
      event_tags: $lookup({
        from: 'events',
        refFrom: '_id',
        refTo: 'event_tags',
        select: 'name avatar',
        reName: 'event_tags',
        operation: '$in',
      }),
      speakers: $lookup({
        from: 'persons',
        refFrom: '_id',
        refTo: 'speakers',
        select: 'name avatar',
        reName: 'speakers',
        operation: '$in',
      }),
      sub_categories: $lookup({
        from: 'categories',
        refFrom: '_id',
        refTo: 'sub_categories',
        select: 'title type name',
        reName: 'sub_categories',
        operation: '$in',
      }),
    };
  }
  get $sets(): {
    country: {
      $set: {
        country: { $first: '$country' };
      };
    };
    author: {
      $set: {
        author: { $first: '$author' };
      };
    };
    trans: {
      $set: {
        trans: { $first: '$trans' };
      };
    };
  } {
    return {
      country: {
        $set: {
          country: { $first: '$country' },
        },
      },
      author: {
        $set: {
          author: { $first: '$author' },
        },
      },
      trans: {
        $set: {
          trans: { $first: '$trans' },
        },
      },
    };
  }
  get $addFields(): {
    categories: any;
  } {
    return {
      categories: {
        categories: {
          $cond: {
            if: {
              $ne: [{ $type: '$categories' }, 'array'],
            },
            then: [],
            else: '$categories',
          },
        },
      },
    };
  }

  constructor({
    collectionName,
    _keys,
    indexes,
  }: {
    collectionName: keyof typeof COLLECTION_NAMES;
    _keys: string[];
    indexes: {
      field: {
        [key: string]: IndexDirection;
      };
      options?: CreateIndexesOptions;
    }[];
  }) {
    this._keys = [..._keys, ...this._defaultKeys].filter((v, i, a) => a.indexOf(v) === i);
    this._collectionName = collectionName;
    this._collection = this.db.collection<any>(collectionName);
    Promise.allSettled(
      indexes.map(
        ({
          field,
          options = {},
        }: {
          field: {
            [key: string]: IndexDirection;
          };
          options?: CreateIndexesOptions;
        }) => {
          return this._collection.createIndex(field, options);
        },
      ),
    ).then((results) => {
      results.forEach((result) => {
        if (result.status === 'rejected') {
          this.logger.error(`error`, `[createIndex:${this._collectionName}:error]`, result.reason);
          throwErr(this.error('common.database'));
        } else {
          // this.logger.debug('success', `[createIndex:${this._collectionName}:success]`, result.value);
        }
      });
      this.logger.debug('success', `[createIndex:${this._collectionName}]`);
    });
  }

  /**
   * Create document
   * @param {any} Filter - filter
   * @param {any} Body - body
   * @param {FindOneAndUpdateOptions} Options - options
   * @returns {Promise<WithId<T> | null> }- WithId<T> | null
   */
  async create(
    { ...filter }: any,
    { updated_at = new Date(), created_at = new Date(), deleted = false, created_by, ..._content }: any,
    { upsert = true, returnDocument = 'after', ...options }: FindOneAndUpdateOptions = {},
  ): Promise<WithId<T> | null> {
    try {
      _content = await this._validate(_content);
      const {
        value,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this._collection.findOneAndUpdate(
        {
          ...filter,
          _id: _content._id,
        },
        {
          $setOnInsert: {
            ..._content,
            created_by,
            created_at,
            updated_at,
            deleted,
          },
        },
        {
          upsert,
          returnDocument,
          ...options,
        },
      );
      if (!ok) {
        throwErr(this.error('common.database'));
      }
      if (updatedExisting && Object.keys(filter).length) {
        throwErr(
          this.error('common.already_exist', [
            {
              path: Object.keys(omit(filter, PRIVATE_KEYS)).join(','),
              message: `${Object.values(omit(filter, PRIVATE_KEYS)).join(',')} already exist`,
            },
          ]),
        );
      }
      this.logger.debug('create_success', `[create:${this._collectionName}:success]`, { _content });
      return value;
    } catch (err) {
      this.logger.error('create_error', `[create:${this._collectionName}:error]`, err.message);
      throw err;
    }
  }
  /**
   * Update document
   * @param {any} - filter
   * @param {any} - body
   * @param {FindOneAndUpdateOptions} - options
   * @returns {Promise<WithId<T> | null>} - WithId<T> | null
   */
  async update(
    { ...filter }: any,
    { $set: { updated_at = new Date(), updated_by, ..._content }, ..._updateFilter }: any,
    { upsert = false, returnDocument = 'after', ...options }: FindOneAndUpdateOptions = {},
  ): Promise<WithId<T> | null> {
    try {
      _content = await this._validate(_content);
      const {
        value,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this._collection.findOneAndUpdate(
        $toMongoFilter(filter),
        {
          $set: {
            ..._content,
            updated_at,
            updated_by,
          },
          ..._updateFilter,
        },
        {
          upsert,
          returnDocument,
          ...options,
        },
      );
      if (!ok) {
        throwErr(this.error('common.database'));
      }
      if (!updatedExisting) {
        throwErr(
          this.error('common.not_found', [
            {
              path: Object.keys(omit(filter, PRIVATE_KEYS)).join(','),
              message: `${Object.values(omit(filter, PRIVATE_KEYS)).join(',')} not found`,
            },
          ]),
        );
      }
      this.logger.debug('update_success', `[update:${this._collectionName}:success]`, { _content });
      return value;
    } catch (err) {
      this.logger.error(`update_error`, `[update:${this._collectionName}:error]`, err.message);
      throw err;
    }
  }

  /**
   * Delete document
   * @param _id
   * @param {ObjectId} deleted_by - user id
   * @returns {Promise<void>} - void
   */
  async delete(
    { ...filter },
    { deleted_at = new Date(), deleted_by, deleted = true }: any,
    { upsert = false, returnDocument = 'after', ...options }: FindOneAndUpdateOptions = {},
  ): Promise<void> {
    try {
      const {
        value,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this._collection.findOneAndUpdate(
        $toMongoFilter(filter),
        {
          $set: {
            deleted,
            deleted_by,
            deleted_at,
          },
        },
        {
          upsert,
          returnDocument,
          ...options,
        },
      );
      if (!ok) {
        throwErr(this.error('common.database'));
      }
      if (!updatedExisting) {
        throwErr(this.error('common.not_found'));
      }
      this.logger.debug('delete_success', `[delete:${this._collectionName}:success]`, { _id: value?._id });
      return;
    } catch (err) {
      this.logger.error('delete_error', `[delete:${this._collectionName}:error]`, err.message);
      throw err;
    }
  }
  /**
   *  Get document
   *  @param {any[]} pipeline - pipeline
   *  @param {AggregateOptions} options
   *  @return {Promise<AggregationCursor<T>>} - AggregationCursor
   */
  get(pipeline: any[] = [], options: AggregateOptions = {}): AggregationCursor<T> {
    try {
      return this._collection.aggregate(pipeline, options);
    } catch (err) {
      this.logger.error('get_error', `[get:${this._collectionName}:error]`, err.message);
      throw err;
    }
  }
  async _validate({ ..._content }: any): Promise<any> {
    try {
      const { categories = [], sub_categories = [], name, _id } = _content;
      categories.length &&
        (await $refValidation({ collection: 'categories', list: $toObjectId(categories) })) &&
        (_content.categories = $toObjectId(categories));
      sub_categories.length &&
        (await $refValidation({
          collection: 'categories',
          list: $toObjectId(sub_categories),
          Refname: 'sub_categories',
        })) &&
        (_content.sub_categories = $toObjectId(sub_categories));
      name &&
        !_id &&
        (_content._id = (await this._collection.findOne({
          _id: slugify(name, {
            replacement: '-',
            lower: true,
            strict: true,
            remove: RemoveSlugPattern,
          }),
        }))
          ? slugify(name, {
              replacement: '-',
              lower: true,
              strict: true,
              locale: 'vi',
              remove: RemoveSlugPattern,
            }) +
            '-' +
            new Date().getTime()
          : slugify(name, {
              replacement: '-',
              lower: true,
              strict: true,
              locale: 'vi',
              remove: RemoveSlugPattern,
            }));
      return _content;
    } catch (err) {
      this.logger.error('validate_error', `[validate:${this._collectionName}:error]`, err.message);
      throw err;
    }
  }
}
