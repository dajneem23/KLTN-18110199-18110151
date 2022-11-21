import { RequestBase } from './request';

export const StoriesService = {
  url: 'stories',
  get(params) {
    return RequestBase.get(`${this.url}/`, params);
  },
  getById(id) {
    return RequestBase.get(`${this.url}/${id}`);
  },
  create(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
  react(id) {
    return RequestBase.patch(`${this.url}/react/${id}`);
  },
};
