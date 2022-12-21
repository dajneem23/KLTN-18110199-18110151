import { RequestBase } from './request';

export const CommentServices = {
  url: 'comments',
  comment(body) {
    return RequestBase.post(`${this.url}`, body);
  },
  upvote(id) {
    return RequestBase.patch(`${this.url}/upvote/${id}`);
  },
  downvote(id) {
    return RequestBase.patch(`${this.url}/downvote/${id}`);
  },
};
