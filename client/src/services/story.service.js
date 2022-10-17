import { RequestBase } from './request';

export const StoriesService = {
  url: 'stories',
  get(params) {
    return RequestBase.get(`${this.url}/`, params);
  },
  create(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
};
