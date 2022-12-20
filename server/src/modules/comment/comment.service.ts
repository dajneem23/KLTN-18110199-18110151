import Container, { Inject, Service, Token } from 'typedi';
import Logger from '@/core/logger';
import { throwErr, toOutPut, toPagingOutput } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import AuthSessionModel from '@/modules/auth/authSession.model';
import AuthService from '../auth/auth.service';
import { $toObjectId, $pagination, $toMongoFilter, $queryByList, $keysToProject } from '@/utils/mongoDB';
import { CommentError, commentModelToken, commentErrors, _comment } from '.';
import { BaseServiceInput, BaseServiceOutput, COLLECTION_NAMES, PRIVATE_KEYS } from '@/types/Common';
import { isNil, omit } from 'lodash';
import { DIMongoDB } from '@/loaders/mongoDBLoader';
import { Db, ObjectId } from 'mongodb';
import { SystemError } from '@/core/errors';
const TOKEN_NAME = '_commentService';
/**
 * A bridge allows another service access to the Model layer
 * @export CommentService
 * @class CommentService
 * @extends {BaseService}
 */
export const CommentServiceToken = new Token<CommentService>(TOKEN_NAME);
/**
 * @class CommentService
 * @extends BaseService
 * @description Comment Service for all comment related operations
 */
@Service(CommentServiceToken)
export class CommentService {
  private logger = new Logger('CommentService');

  private model = Container.get(commentModelToken);

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private authService: AuthService;

  private error(msg: keyof typeof commentErrors) {
    return new CommentError(msg);
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
   * Create a new Comment
   * @param _content
   * @param _subject
   * @returns {Promise<BaseServiceOutput>}
   */
  async create({ _content, _subject }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { type, source_id, reply_to } = _content;
      if (!Object.keys(COLLECTION_NAMES).includes(type)) {
        throw new SystemError('common.collection_not_found');
      }
      const _id = new ObjectId();
      const value = await this.model.create(
        {
          _id,
        },
        {
          ..._comment,
          ..._content,
          ...(_subject && { author: new ObjectId(_subject) }),
        },
      );

      if (!reply_to) {
        await Container.get(DIMongoDB)
          .collection(type)
          .updateOne(
            {
              _id: new ObjectId(source_id),
            },
            {
              $addToSet: {
                comments: _id,
              },
            },
          );
      } else {
        await this.model.update(
          {
            _id: new ObjectId(reply_to),
          },
          {
            $addToSet: { replies: _id },
          },
        );
      }
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
   * Delete comment
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
  async upVote({ _subject, _id }: BaseServiceInput) {
    try {
      const { up_votes, down_votes } = await this.model.update($toMongoFilter({ _id }), {
        $addToSet: { up_votes: _subject },
        $pull: { down_votes: _subject },
      });
      this.logger.debug('update_success', {});
      return toOutPut({
        item: { up_votes, down_votes },
        //  keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
  async downVote({ _subject, _id }: BaseServiceInput) {
    try {
      //ToDO: check if user already up vote

      const { down_votes, up_votes } = await this.model.update($toMongoFilter({ _id }), {
        $addToSet: { down_votes: _subject },
        $pull: { up_votes: _subject },
      });
      this.logger.debug('update_success', {});
      return toOutPut({
        item: { down_votes, up_votes },
        //  keys: this.model._keys,
      });
    } catch (err) {
      this.logger.error('react_error', err.message);
      throw err;
    }
  }
}
