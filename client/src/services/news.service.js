import { RequestBase } from './request';

export const NewsServices = {
  url: 'articles',
  get(params) {
    return RequestBase.get(`${this.url}/`, params);
  },
  getFollowing(params) {
    return RequestBase.get(`${this.url}/following`, params);
  },
  getById(id) {
    return RequestBase.get(`${this.url}/${id}`);
  },
  create(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
  getHot(params) {
    return RequestBase.get(`${this.url}/hot/`, params);
  },
  getTop(params) {
    return RequestBase.get(`${this.url}/top/`, params);
  },
  react(id) {
    return RequestBase.patch(`${this.url}/react/${id}`);
  },
  upvote(id) {
    return RequestBase.patch(`${this.url}/upvote/${id}`);
  },
  downvote(id) {
    return RequestBase.patch(`${this.url}/downvote/${id}`);
  },
};
