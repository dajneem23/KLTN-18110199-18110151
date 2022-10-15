import { Service, Token } from 'typedi';
import { Manga } from './manga.type';
import { BaseModel } from '../base/base.model';
import { keys } from 'ts-transformer-keys';

const COLLECTION_NAME = 'manga';
const TOKEN_NAME = '_mangaModel';
export const mangaModelToken = new Token<CoinModel>(TOKEN_NAME);
/**
 * @class CoinModel
 * @extends BaseModel
 * @description Coin model: Coin model for all manga related operations
 */
@Service(mangaModelToken)
export class CoinModel extends BaseModel {
  constructor() {
    super({
      collectionName: COLLECTION_NAME,
      _keys: keys<Manga>(),
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
