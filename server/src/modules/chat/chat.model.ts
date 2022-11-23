import { Service, Token } from 'typedi';
import { BaseModel } from '../base/base.model';
import { keys } from 'ts-transformer-keys';
import { Chat } from './chat.type';

const COLLECTION_NAME = 'chats';
export const chatModelToken = new Token<ChatModel>('_chatModel');
/**
 * @class CoinModel
 * @extends BaseModel
 * @description Coin model: Coin model for all chat related operations
 */
@Service(chatModelToken)
export class ChatModel extends BaseModel {
  constructor() {
    super({
      collectionName: COLLECTION_NAME,
      _keys: keys<Chat>(),
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

export const mangaChapterModelToken = new Token<MangaModel>('_mangaChapterModel');
/**
 * @class CoinModel
 * @extends BaseModel
 * @description Coin model: Coin model for all manga related operations
 */
@Service(mangaChapterModelToken)
export class MangaChapterModel extends BaseModel {
  constructor() {
    super({
      collectionName: 'manga-chapters',
      _keys: keys<MangaChapter>(),
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
