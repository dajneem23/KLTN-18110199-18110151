import { RequestBase } from './request';

export const CommentServices = {
  url: 'comments',
  comment(body) {
    return RequestBase.post(`${this.url}`, body);
  },
};
