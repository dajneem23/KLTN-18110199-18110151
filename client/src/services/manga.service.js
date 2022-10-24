import { RequestBase } from './request';

export const MangaServices = {
  url: 'manga',
  get(params) {
    return RequestBase.get(`${this.url}/`, params);
  },
  getById(id) {
    return RequestBase.get(`${this.url}/${id}`);
  },
  create(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
  getChapterById(id) {
    return RequestBase.get(`${this.url}/chapter/${id}`);
  },
};
