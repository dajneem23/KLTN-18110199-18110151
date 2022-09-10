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
import Container, { Inject, Service } from 'typedi';
import { DIMongoDB } from '@/loaders/mongoDBLoader';
import { DILogger } from '@/loaders/loggerLoader';
import Logger from '@/core/logger';
import { CommonError, errors } from '@/core/errors/CommonError';
import { throwErr } from '@/utils/common';
import { $toMongoFilter, $toObjectId } from '@/utils/mongoDB';
import { categoriesValidation } from '@/utils/validation';
import { T } from '@/types';

/**
 * @class BaseModel
 * @description Base model for all models
 */
export class BaseModel {
  readonly _collection: Collection;

  readonly _collectionName: string;

  readonly _keys: (string | number | symbol)[];

  readonly _defaultFilter = {
    deleted: false,
  };
  // Get Db instance from DI
  private db: Db = Container.get(DIMongoDB) as Db;
  // Get logger Instance from DI
  private logger: Logger = Container.get(DILogger) as Logger;

  private error(msg: keyof typeof errors): CommonError {
    return new CommonError(msg);
  }

  constructor({
    collectionName,
    _keys,
    indexes,
  }: {
    collectionName: string;
    _keys: string[];
    indexes: {
      field: {
        [key: string]: IndexDirection;
      };
      options?: CreateIndexesOptions;
    }[];
  }) {
    this._keys = _keys;
    this._collectionName = collectionName;
    this._collection = this.db.collection<any>(collectionName);
    Promise.allSettled(
      indexes.map(
        ({
          field,
          options,
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
          this.logger.error(`[createIndex:${this._collectionName}:error]`, result.reason);
          throwErr(this.error('common.database'));
        } else {
          this.logger.debug(`[createIndex:${this._collectionName}:success]`, result.value);
        }
      });
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
      const { categories = [] } = _content;
      categories.length && (await categoriesValidation($toObjectId(categories)));
      categories.length && (_content.categories = $toObjectId(categories));
      const {
        value,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this._collection.findOneAndUpdate(
        { ...filter },
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
      if (updatedExisting) {
        throwErr(this.error('common.already_exist'));
      }
      this.logger.debug(`[create:${this._collectionName}:success]`, { _content });
      return value;
    } catch (err) {
      this.logger.error(`[create:${this._collectionName}:error]`, err.message);
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
    { updated_at = new Date(), updated_by, ..._content }: any,
    { upsert = false, returnDocument = 'after', ...options }: FindOneAndUpdateOptions = {},
  ): Promise<WithId<T> | null> {
    try {
      const { categories = [] } = _content;
      categories.length && (await categoriesValidation($toObjectId(categories)));
      categories.length && (_content.categories = $toObjectId(categories));
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
      this.logger.debug(`[update:${this._collectionName}:success]`, { _content });
      return value;
    } catch (err) {
      this.logger.error(`[update:${this._collectionName}:error]`, err.message);
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
      this.logger.debug(`[delete:${this._collectionName}:success]`, { _id: value?._id });
      return;
    } catch (err) {
      this.logger.error(`[delete:${this._collectionName}:error]`, err.message);
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
      this.logger.error(`[get:${this._collectionName}:error]`, err.message);
      throw err;
    }
  }
}
