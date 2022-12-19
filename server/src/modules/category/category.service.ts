import Container, { Inject, Service, Token } from 'typedi';
import Logger from '@/core/logger';
import { throwErr, toOutPut, toPagingOutput } from '@/utils/common';
import { alphabetSize12 } from '@/utils/randomString';
import AuthSessionModel from '@/modules/auth/authSession.model';
import AuthService from '../auth/auth.service';
import { $toObjectId, $pagination, $toMongoFilter, $queryByList, $keysToProject, $lookup } from '@/utils/mongoDB';
import { CategoryError, categoryModelToken, CategoryErrors } from '.';
import { BaseServiceInput, BaseServiceOutput, PRIVATE_KEYS } from '@/types/Common';
import { isNil, omit } from 'lodash';
import { ObjectId } from 'mongodb';
const TOKEN_NAME = '_CategoryService';
/**
 * A bridge allows another service access to the Model layer
 * @export CategoryService
 * @class CategoryService
 * @extends {BaseService}
 */
export const CategoryServiceToken = new Token<CategoryService>(TOKEN_NAME);
/**
 * @class CategoryService
 * @extends BaseService
 * @description Category Service for all Category related operations
 */
@Service(CategoryServiceToken)
export class CategoryService {
  private logger = new Logger('CategoryService');

  private model = Container.get(categoryModelToken);

  @Inject()
  private authSessionModel: AuthSessionModel;

  @Inject()
  private authService: AuthService;

  private error(msg: keyof typeof CategoryErrors) {
    return new CategoryError(msg);
  }

  get outputKeys() {
    return this.model._keys;
  }

  /**
   *  Query Category
   * @param {any} _filter
   * @param {BaseQuery} _query
   * @returns {Promise<BaseServiceOutput>}
   *
   **/
  async query({ _filter, _query, _permission }: BaseServiceInput): Promise<BaseServiceOutput> {
    try {
      const { q } = _filter;
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
            },
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
}
