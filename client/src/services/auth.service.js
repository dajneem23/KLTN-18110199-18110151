import { RequestBase } from './request';
export const AuthService = {
  url: 'auth',
  login(body) {
    return RequestBase.post(`${this.url}/login`, body);
  },
  logout(body) {
    return RequestBase.get(`${this.url}/logout`);
  },
  register(body) {
    return RequestBase.post(`${this.url}/register`, body);
  },
};
