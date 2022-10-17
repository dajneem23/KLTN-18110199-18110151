import { RequestBase } from './request';

export const UserService = {
  url: 'stories',
  get(params) {
    return RequestBase.get(`${this.url}/`, params);
  },
};
