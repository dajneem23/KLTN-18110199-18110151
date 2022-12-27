import { RequestBase } from './request';

export const CommentServices = {
  url: 'comments',
  comment(body) {
    return RequestBase.post(`${this.url}`, body);
  },
  update(id, body) {
    return RequestBase.put(`${this.url}/${id}`, body);
  },
  delete(id) {
    return RequestBase.delete(`${this.url}/${id}`);
  },
  upvote(id) {
    return RequestBase.patch(`${this.url}/upvote/${id}`);
  },
  downvote(id) {
    return RequestBase.patch(`${this.url}/downvote/${id}`);
  },
};
