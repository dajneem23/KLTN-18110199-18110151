import { RequestBase } from './request';
export const ChatsServices = {
  url: 'chats',
  get(body) {
    return RequestBase.get(`${this.url}/`, body);
  },
  getChatById(id) {
    return RequestBase.get(`${this.url}/${id}`);
  },
  createChat(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
  createMessage(id, body) {
    return RequestBase.post(`${this.url}/message/${id}`, body);
  },
};
