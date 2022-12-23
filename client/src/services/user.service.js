import { RequestBase } from './request';

export const UserService = {
  url: 'users',
  me() {
    return RequestBase.get(`${this.url}/me`);
  },
  updateProfile(body) {
    return RequestBase.put(`${this.url}/me`, body);
  },
  followUser(id) {
    return RequestBase.patch(`${this.url}/follow_user/${id}`);
  },
  followCategory(id) {
    return RequestBase.patch(`${this.url}/follow_category/${id}`);
  },
};
