import { RequestBase } from './request';

export const NewsServices = {
  url: 'news',
  get(params) {
    return RequestBase.get(`${this.url}/`, params);
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
