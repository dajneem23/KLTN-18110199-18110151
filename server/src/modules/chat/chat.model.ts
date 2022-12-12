import { Service, Token } from 'typedi';
import { BaseModel } from '../base/base.model';
import { keys } from 'ts-transformer-keys';
import { Chat, Message } from './chat.type';

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
      indexes: [],
    });
  }
}

export const messageModelToken = new Token<MessageModel>('_messageModel');
/**
 * @class CoinModel
 * @extends BaseModel
 * @description Coin model: Coin model for all chat related operations
 */
@Service(messageModelToken)
export class MessageModel extends BaseModel {
  constructor() {
    super({
      collectionName: 'messages',
      _keys: keys<Message>(),
      indexes: [],
    });
  }
}
