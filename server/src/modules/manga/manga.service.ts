import Container, { Inject, Service, Token } from 'typedi';
import Logger from '@/core/logger';
import { throwErr, toOutPut, toPagingOutput } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import AuthSessionModel from '@/modules/auth/authSession.model';
import AuthService from '../auth/auth.service';
import { $toObjectId, $pagination, $toMongoFilter, $queryByList, $keysToProject, $lookup } from '@/utils/mongoDB';
import { MangaError, mangaModelToken, mangaErrors, _manga, mangaChapterModelToken, _mangaChapter } from '.';
import { BaseServiceInput, BaseServiceOutput, PRIVATE_KEYS, RemoveSlugPattern } from '@/types/Common';
import { isNil, omit } from 'lodash';
import slugify from 'slugify';
import { ObjectId } from 'mongodb';
const TOKEN_NAME = '_mangaService';
/**
 * A bridge allows another service access to the Model layer
 * @export MangaService
 * @class MangaService
 * @extends {BaseService}
 */
export const MangaServiceToken = new Token<MangaService>(TOKEN_NAME);
/**
 * @class MangaService
 * @extends BaseService
 * @description Manga Service for all manga related operations
 */
@Service(MangaServiceToken)
export class MangaService {
  private logger = new Logger('MangaService');

  private model = Container.get(mangaModelToken);

  private mangaChapterModel = Container.get(mangaChapterModelToken);

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private authService: AuthService;

  private error(msg: keyof typeof mangaErrors) {
    return new MangaError(msg);
  }

  get outputKeys() {
    return this.model._keys;
  }

  /**
   * Create a new Manga
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async create({ _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { name, categories = [], chapters = [] } = _content;
      _content.chapters = await this.recursiveCreateChapter({ chapters, _subject });
      const value = await this.model.create(
        {
          name,
        },
        {
          ..._manga,
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
   * Create a new Manga
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async createChapter({ _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { name, categories = [] } = _content;
      const value = await this.mangaChapterModel.create(
        {
          name,
        },
        {
          ..._mangaChapter,
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
   * Update category
   * @param _id
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async updateChapter({ _slug: slug, _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      await this.mangaChapterModel.update($toMongoFilter({ slug }), {
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
   * Delete manga
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
   * Delete manga
   * @param _id
   * @param {ObjectId} _subject
   * @returns {Promise<void>}
   */
  async deleteChapter({ _slug: slug, _subject }: BaseServiceInput): Promise<void> {
    try {
      await this.mangaChapterModel.delete($toMongoFilter({ slug }), {
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
   *  Query manga
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
            $addFields: {
              ...this.model.$addFields.categories,
              chapters: {
                $cond: {
                  if: {
                    $ne: [{ $type: '$chapters' }, 'array'],
                  },
                  then: [],
                  else: '$chapters',
                },
              },
            },
            $lookups: [
              this.model.$lookups.categories,
              $lookup({
                from: 'manga-chapters',
                refFrom: '_id',
                refTo: 'chapters',
                select: 'name description images index',
                reName: 'chapters',
                operation: '$in',
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
   *  Query manga
   * @param {any} _filter
   * @param {BaseQuery} _query
   * @returns {Promise<BaseServiceOutput>}
   *
   **/
  async queryChapter({ _filter, _query, _permission }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { q, categories = [] } = _filter;
      const { page = 1, per_page = 10, sort_by, sort_order } = _query;
      const [{ total_count } = { total_count: 0 }, ...items] = await this.mangaChapterModel
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
            $addFields: this.model.$addFields.categories,
            $lookups: [this.model.$lookups.categories],
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
   * Get Manga by ID
   * @param id - Manga ID
   * @returns { Promise<BaseServiceOutput> } - Manga
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
              chapters: {
                $cond: {
                  if: {
                    $ne: [{ $type: '$chapters' }, 'array'],
                  },
                  then: [],
                  else: '$chapters',
                },
              },
            },
          },
          this.model.$lookups.categories,
          $lookup({
            from: 'manga-chapters',
            refFrom: '_id',
            refTo: 'chapters',
            select: 'name description images index',
            reName: 'chapters',
            operation: '$in',
          }),
          this.model.$lookups.author,
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
   * Get Manga by ID
   * @param id - Manga ID
   * @returns { Promise<BaseServiceOutput> } - Manga
   */
  async getChapterById({ _slug: slug, _filter, _permission = 'public' }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const [item] = await this.mangaChapterModel
        .get([
          {
            $match: {
              ...$toMongoFilter({
                slug,
              }),
            },
          },
          {
            $addFields: this.model.$addFields.categories,
          },
          this.model.$lookups.categories,
          this.model.$lookups.author,
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
            $addFields: this.model.$addFields.categories,
            $lookups: [this.model.$lookups.categories],
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
  recursiveCreateChapter(
    {
      chapters = [],
      _subject,
    }: {
      chapters: any[];
      _subject: string;
    },
    update = false,
  ): any {
    return Promise.all(
      chapters.map(async ({ name, ...content }) => {
        const _name = slugify(name, {
          trim: true,
          lower: true,
          remove: RemoveSlugPattern,
        });
        const slug = (await this.mangaChapterModel._collection.findOne({
          slug: _name,
        }))
          ? _name + '-' + new Date().getTime()
          : _name;
        const {
          value,
          lastErrorObject: { updatedExisting },
        } = await this.mangaChapterModel._collection.findOneAndUpdate(
          {
            slug,
          },
          {
            $set: {
              ...((update && {
                slug,
                name,
                updated_at: new Date(),
                ...content,
                deleted: false,
                updated_by: _subject,
              }) ||
                {}),
            },
          },
          {
            upsert: false,
            returnDocument: 'after',
          },
        );
        if (!updatedExisting) {
          const { value: newValue } = await this.mangaChapterModel._collection.findOneAndUpdate(
            {
              slug,
            },
            {
              $setOnInsert: {
                slug,
                name,
                ...content,
                updated_at: new Date(),
                created_at: new Date(),
                deleted: false,
                created_by: _subject,
              },
            },
            {
              upsert: true,
              returnDocument: 'after',
            },
          );
          return newValue._id;
        }
        return value._id;
      }),
    );
  }
}
