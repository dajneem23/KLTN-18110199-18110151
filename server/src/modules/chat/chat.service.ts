import Container, { Inject, Service, Token } from 'typedi';
import Logger from '@/core/logger';
import { throwErr, toOutPut, toPagingOutput } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import AuthSessionModel from '@/modules/auth/authSession.model';
import AuthService from '../auth/auth.service';
import { $toObjectId, $pagination, $toMongoFilter, $queryByList, $keysToProject, $lookup } from '@/utils/mongoDB';
import { ChatError, chatModelToken, chatErrors, _chat, messageModelToken } from '.';
import { BaseServiceInput, BaseServiceOutput, PRIVATE_KEYS, RemoveSlugPattern } from '@/types/Common';
import { isNil, omit, uniq } from 'lodash';
import slugify from 'slugify';
import { ObjectId } from 'mongodb';
const TOKEN_NAME = '_chatService';
/**
 * A bridge allows another service access to the Model layer
 * @export ChatService
 * @class ChatService
 * @extends {BaseService}
 */
export const ChatServiceToken = new Token<ChatService>(TOKEN_NAME);
/**
 * @class ChatService
 * @extends BaseService
 * @description Chat Service for all chat related operations
 */
@Service(ChatServiceToken)
export class ChatService {
  private logger = new Logger('ChatService');

  private model = Container.get(chatModelToken);

  private messageModel = Container.get(messageModelToken);

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private authService: AuthService;

  private error(msg: keyof typeof chatErrors) {
    return new ChatError(msg);
  }

  get outputKeys() {
    return this.model._keys;
  }

  /**
   * Create a new Chat
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async create({ _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { messages = [], users: _users = [] } = _content;
      const users = uniq([_subject, ..._users]).map($toObjectId);
      const value = await this.model.create(
        {
          _id: new ObjectId(),
        },
        {
          ..._chat,
          ..._content,
          messages,
          type: users.length > 2 ? 'group' : 'private',
          users,
          ...(_subject && { author: new ObjectId(_subject) }),
        },
      );
      this.logger.debug('create_success', { _content });
      return toOutPut({ item: value });
    } catch (err) {
      this.logger.error('create_error', err);
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
   * Delete chat
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
   *  Query chat
   * @param {any} _filter
   * @param {BaseQuery} _query
   * @returns {Promise<BaseServiceOutput>}
   *
   **/
  async query({ _filter, _query, _permission, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { q, type } = _filter;
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
              ...(type && {
                type,
              }),
              users: new ObjectId(_subject),
            },
            $addFields: { ...this.model.$addFields.images },
            $lookups: [
              this.model.$lookups.upload_files({
                refTo: 'images',
                reName: 'images',
                operation: '$in',
              }),
              this.model.$lookups.chat_users,
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
   * Get Chat by ID
   * @param id - Chat ID
   * @returns { Promise<BaseServiceOutput> } - Chat
   */
  async getById({ _id, _filter, _permission = 'public' }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const [item] = await this.model
        .get([
          {
            $match: {
              ...$toMongoFilter({
                _id,
              }),
            },
          },
          {
            $addFields: {
              ...this.model.$addFields.images,
            },
          },
          this.model.$lookups.upload_files(),
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
            $addFields: { ...this.model.$addFields.images },
            $lookups: [
              this.model.$lookups.upload_files(),
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
        //  keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }

  async createMessage({ _subject, _content }: BaseServiceInput) {
    try {
      const { chat_id } = _content;
      if (!chat_id) {
        throwErr(this.error('NOT_FOUND'));
      }
      const { _id } = await this.messageModel.create(
        {},
        {
          ..._content,
          ...(_subject && { author: new ObjectId(_subject) }),
        },
      );
      await this.model.update(
        { _id: new ObjectId(chat_id) },
        {
          $addToSet: {
            messages: new ObjectId(_id),
          },
        },
      );
    } catch (err) {
      this.logger.error('create_error', err.message);
      throw err;
    }
  }
}
