import { RequestBase } from './request';
export const CategoriesServices = {
  url: 'categories',
  get() {
    return RequestBase.get(`${this.url}/`);
  },
};
