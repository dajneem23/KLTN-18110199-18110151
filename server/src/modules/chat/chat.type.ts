import { BaseModel, _defaultBaseModel } from '@/types';

export interface Chat extends BaseModel {
  users?: string[];
  type?: 'private' | 'group';
  messages: string[];
}
export const _chat: Chat = {
  users: [],
  messages: [],
  ..._defaultBaseModel,
};
export interface Message extends BaseModel {
  content: string;
  attachments: string[];
  reply_to?: string;
}

export const _message: Message = {
  content: '',
  attachments: [],
  ..._defaultBaseModel,
};
