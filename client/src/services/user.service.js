import { RequestBase } from './request';

export const UserService = {
  url: 'users',
  me() {
    return RequestBase.get(`${this.url}/me`);
  },
};
