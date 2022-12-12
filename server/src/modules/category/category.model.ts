import { Service, Token } from 'typedi';
import { Category } from './category.type';
import { BaseModel } from '../base/base.model';
import { keys } from 'ts-transformer-keys';

const COLLECTION_NAME = 'categories';
const TOKEN_NAME = '_categoryModel';
export const categoryModelToken = new Token<CategoryModel>(TOKEN_NAME);
/**
 * @class CoinModel
 * @extends BaseModel
 * @description Coin model: Coin model for all category related operations
 */
@Service(categoryModelToken)
export class CategoryModel extends BaseModel {
  constructor() {
    super({
      collectionName: COLLECTION_NAME,
      _keys: keys<Category>(),
      indexes: [],
    });
  }
}
