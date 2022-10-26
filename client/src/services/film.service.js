import { RequestBase } from './request';

export const FilmServices = {
  url: 'films',
  get(params) {
    return RequestBase.get(`${this.url}/`, params);
  },
  getById(id) {
    return RequestBase.get(`${this.url}/${id}`);
  },
  create(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
  search(params, name) {
    return RequestBase.get(`${this.url}/search`, params);
  },
};
