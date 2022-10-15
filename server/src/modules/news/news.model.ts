import { Service, Token } from 'typedi';
import { News } from './news.type';
import { BaseModel } from '../base/base.model';
import { keys } from 'ts-transformer-keys';

const COLLECTION_NAME = 'news';
const TOKEN_NAME = '_newsModel';
export const newsModelToken = new Token<CoinModel>(TOKEN_NAME);
/**
 * @class CoinModel
 * @extends BaseModel
 * @description Coin model: Coin model for all news related operations
 */
@Service(newsModelToken)
export class CoinModel extends BaseModel {
  constructor() {
    super({
      collectionName: COLLECTION_NAME,
      _keys: keys<News>(),
      indexes: [
        {
          field: {
            name: 1,
          },
          options: {
            unique: true,
          },
        },
        {
          field: {
            name: 'text',
          },
        },
        {
          field: {
            slug: 1,
          },
          options: {
            unique: true,
          },
        },
      ],
    });
  }
}
