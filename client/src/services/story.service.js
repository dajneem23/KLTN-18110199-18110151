import { RequestBase } from './request';

export const StoriesService = {
  url: 'stories',
  get(params) {
    return RequestBase.get(`${this.url}/`, params);
  },
  getMyStories(params) {
    return RequestBase.get(`${this.url}/my`, params);
  },
  getById(id) {
    return RequestBase.get(`${this.url}/${id}`);
  },
  getByUserId(id,params) {
    return RequestBase.get(`${this.url}/user/${id}`,params);
  },
  create(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
  update(id, body) {
    return RequestBase.put(`${this.url}/${id}`, body);
  },
  delete(id) {
    return RequestBase.delete(`${this.url}/${id}`);
  },
  react(id) {
    return RequestBase.patch(`${this.url}/react/${id}`);
  },
  getPostsFollow(params) {
    return RequestBase.get(`${this.url}/following/`, params);
  },
};
