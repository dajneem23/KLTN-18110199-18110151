import { RequestBase } from './request';
export const AuthService = {
  url: 'chats',
  createChat(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
  createMessage(id, body) {
    return RequestBase.post(`${this.url}/message/${id}`, body);
  },
};