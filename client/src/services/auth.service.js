import { RequestBase } from './request';
export const AuthService = {
  url: 'auth',
  login(body) {
    return RequestBase.post(`${this.url}/login`, body);
  },
  register(body) {
    return RequestBase.post(`${this.url}/register`,body);
  },
};
