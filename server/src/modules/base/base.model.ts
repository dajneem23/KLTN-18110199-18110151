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
    deleted: {
      $ne: true,
    },
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
    categories: any;
    author: any;
    sub_categories: any;
    upload_files: any;
    comments: any;
    chat_users: any;
    messages: any;
    following: any;
  } {
    return {
      categories: $lookup({
        from: 'categories',
        refFrom: '_id',
        refTo: 'categories',
        select: 'name type slug',
        reName: 'categories',
        operation: '$in',
      }),
      author: $lookup({
        from: 'users-permissions_user',
        refFrom: '_id',
        refTo: 'author',
        select: 'username avatar',
        reName: 'author',
        operation: '$eq',
        pipeline: [
          $lookup({
            from: COLLECTION_NAMES.upload_file,
            refFrom: '_id',
            refTo: 'avatar',
            select: 'name url size',
            reName: 'avatar',
            operation: '$eq',
          }),
        ],
      }),
      upload_files: ({
        from = COLLECTION_NAMES.upload_file,
        refFrom = '_id',
        refTo = 'image',
        select = 'name url size',
        reName = 'image',
        operation = '$eq',
      }: {
        from?: COLLECTION_NAMES;
        refFrom?: string;
        refTo?: string;
        select?: string;
        reName?: string;
        operation?: '$eq' | '$in';
      } = {}) =>
        $lookup({
          from,
          refFrom,
          refTo,
          select,
          reName,
          operation,
        }),

      sub_categories: $lookup({
        from: 'categories',
        refFrom: '_id',
        refTo: 'sub_categories',
        select: 'title type name',
        reName: 'sub_categories',
        operation: '$in',
      }),
      chat_users: $lookup({
        from: 'users-permissions_user',
        refFrom: '_id',
        refTo: 'users',
        select: 'username avatar',
        reName: 'users',
        operation: '$in',
        pipeline: [
          $lookup({
            from: COLLECTION_NAMES.upload_file,
            refFrom: '_id',
            refTo: 'avatar',
            select: 'name url size',
            reName: 'avatar',
            operation: '$eq',
          }),
        ],
      }),
      following: $lookup({
        from: 'users-permissions_user',
        refFrom: '_id',
        refTo: 'following',
        select: 'username avatar',
        reName: 'following',
        operation: '$in',
        pipeline: [
          $lookup({
            from: COLLECTION_NAMES.upload_file,
            refFrom: '_id',
            refTo: 'avatar',
            select: 'name url size',
            reName: 'avatar',
            operation: '$eq',
          }),
        ],
      }),
      messages: $lookup({
        from: 'messages',
        refFrom: '_id',
        refTo: 'messages',
        select: 'content images type author deleted createdAt updatedAt',
        reName: 'messages',
        operation: '$in',
        pipeline: [
          {
            $match: {
              deleted: {
                $ne: true,
              },
            },
          },
          $lookup({
            from: 'users-permissions_user',
            refFrom: '_id',
            refTo: 'author',
            select: 'username avatar',
            reName: 'author',
            operation: '$eq',
            pipeline: [
              $lookup({
                from: COLLECTION_NAMES.upload_file,
                refFrom: '_id',
                refTo: 'avatar',
                select: 'name url size',
                reName: 'avatar',
                operation: '$eq',
              }),
            ],
          }),
          {
            $set: {
              author: { $first: '$author' },
            },
          },
        ],
      }),
      comments: $lookup({
        from: 'comments',
        refFrom: '_id',
        refTo: 'comments',
        select: 'content images type replies author up_votes down_votes deleted',
        reName: 'comments',
        operation: '$in',
        pipeline: [
          {
            $match: {
              deleted: {
                $ne: true,
              },
            },
          },
          {
            $addFields: {
              votes: { $subtract: [{ $size: '$up_votes' }, { $size: '$down_votes' }] },
            },
          },
          { $sort: { votes: -1 } },
          $lookup({
            from: 'users-permissions_user',
            refFrom: '_id',
            refTo: 'author',
            select: 'username avatar',
            reName: 'author',
            operation: '$eq',
            pipeline: [
              $lookup({
                from: COLLECTION_NAMES.upload_file,
                refFrom: '_id',
                refTo: 'avatar',
                select: 'name url size',
                reName: 'avatar',
                operation: '$eq',
              }),
            ],
          }),
          {
            $set: {
              author: { $first: '$author' },
            },
          },
          $lookup({
            from: 'comments',
            refFrom: '_id',
            refTo: 'replies',
            select: 'content images type replies author up_votes down_votes deleted',
            reName: 'replies',
            operation: '$in',
            pipeline: [
              {
                $match: {
                  deleted: {
                    $ne: true,
                  },
                },
              },
              {
                $addFields: {
                  votes: { $subtract: [{ $size: '$up_votes' }, { $size: '$down_votes' }] },
                },
              },
              { $sort: { votes: -1 } },
              $lookup({
                from: 'users-permissions_user',
                refFrom: '_id',
                refTo: 'author',
                select: 'username avatar',
                reName: 'author',
                operation: '$eq',
                pipeline: [
                  $lookup({
                    from: COLLECTION_NAMES.upload_file,
                    refFrom: '_id',
                    refTo: 'avatar',
                    select: 'name url size',
                    reName: 'avatar',
                    operation: '$eq',
                  }),
                ],
              }),
              {
                $set: {
                  author: { $first: '$author' },
                },
              },
            ],
          }),
        ],
      }),
    };
  }
  get $sets(): {
    image: {
      $set: {
        image: { $first: '$image' };
      };
    };
    author: {
      $set: {
        author: { $first: '$author' };
      };
    };
  } {
    return {
      author: {
        $set: {
          author: { $first: '$author' },
        },
      },
      image: {
        $set: {
          image: { $first: '$image' },
        },
      },
    };
  }
  get $addFields(): {
    categories: any;
    images: any;
    comments: any;
    following: any;
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
      images: {
        images: {
          $cond: {
            if: {
              $ne: [{ $type: '$images' }, 'array'],
            },
            then: [],
            else: '$images',
          },
        },
      },
      comments: {
        comments: {
          $cond: {
            if: {
              $ne: [{ $type: '$comments' }, 'array'],
            },
            then: [],
            else: '$comments',
          },
        },
      },
      following: {
        following: {
          $cond: {
            if: {
              $ne: [{ $type: '$following' }, 'array'],
            },
            then: [],
            else: '$following',
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
    // Promise.allSettled(
    //   indexes.map(
    //     ({
    //       field,
    //       options = {},
    //     }: {
    //       field: {
    //         [key: string]: IndexDirection;
    //       };
    //       options?: CreateIndexesOptions;
    //     }) => {
    //       return this._collection.createIndex(field, options);
    //     },
    //   ),
    // ).then((results) => {
    //   results.forEach((result) => {
    //     if (result.status === 'rejected') {
    //       this.logger.error(`error`, `[createIndex:${this._collectionName}:error]`, result.reason);
    //       throwErr(this.error('common.database'));
    //     } else {
    //       // this.logger.debug('success', `[createIndex:${this._collectionName}:success]`, result.value);
    //     }
    //   });
    //   this.logger.debug('success', `[createIndex:${this._collectionName}]`);
    // });
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
    { updated_at, created_at, updatedAt, createdAt, deleted = false, created_by, ..._content }: any,
    { upsert = true, returnDocument = 'after', ...options }: FindOneAndUpdateOptions = {},
  ): Promise<WithId<T> | null> {
    try {
      _content = await this._validate(_content);
      created_at = created_at || Date.now();
      updated_at = updated_at || Date.now();
      createdAt = createdAt || Date.now();
      updatedAt = updatedAt || Date.now();
      const {
        value,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this._collection.findOneAndUpdate(
        {
          ...filter,
          // _id: _content._id,
        },
        {
          $setOnInsert: {
            ..._content,
            created_by,
            created_at,
            updated_at,
            updatedAt,
            createdAt,
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
    {
      $set: { updated_at, updatedAt, ..._content } = {
        updated_at: Date.now(),
        updatedAt: Date.now(),
      },
      ..._updateFilter
    }: any,
    { upsert = false, returnDocument = 'after', ...options }: FindOneAndUpdateOptions = {},
  ): Promise<WithId<T> | null> {
    try {
      updated_at = updated_at || Date.now();
      updatedAt = updatedAt || Date.now();
      _content = await this._validate(_content);
      const {
        value,
        ok,
        lastErrorObject: { updatedExisting },
      } = await this._collection.findOneAndUpdate(
        filter,
        {
          $set: {
            ..._content,
            updated_at,
            updatedAt,
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
    { deleted_at, deleted_by, deleted = true }: any,
    { upsert = false, returnDocument = 'after', ...options }: FindOneAndUpdateOptions = {},
  ): Promise<void> {
    try {
      deleted_at = deleted_at || Date.now();
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
      const { categories = [], sub_categories = [], name, slug } = _content;
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
      const _name =
        name &&
        slugify(name, {
          replacement: '-',
          lower: true,
          strict: true,
          locale: 'vi',
          remove: RemoveSlugPattern,
        });
      name &&
        !slug &&
        (_content.slug = (await this._collection.findOne({
          slug: _name,
        }))
          ? _name + '-' + new Date().getTime()
          : _name);
      return _content;
    } catch (err) {
      this.logger.error('validate_error', `[validate:${this._collectionName}:error]`, err.message);
      throw err;
    }
  }
}
