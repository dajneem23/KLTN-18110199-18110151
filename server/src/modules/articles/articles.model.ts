import { Service, Token } from 'typedi';
import { News } from './articles.type';
import { BaseModel } from '../base/base.model';
import { keys } from 'ts-transformer-keys';

const COLLECTION_NAME = 'articles';
const TOKEN_NAME = '_newsModel';
export const newsModelToken = new Token<NewsModel>(TOKEN_NAME);
/**
 * @class CoinModel
 * @extends BaseModel
 * @description Coin model: Coin model for all news related operations
 */
@Service(newsModelToken)
export class NewsModel extends BaseModel {
  constructor() {
    super({
      collectionName: COLLECTION_NAME,
      _keys: keys<News>(),
      indexes: [
        {
          field: {
            name: 1,
          },
        },
        {
          field: {
            name: 'text',
          },
        },
      ],
    });
  }
}
