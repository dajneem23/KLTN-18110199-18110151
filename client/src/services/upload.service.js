import { RequestBase } from './request';

export const UploadServices = {
  url: 'upload',
  /**
   * 
   * @param {*} body 
   * @returns  {Promise} {url: 'http://localhost:3000/upload/5e7b5b0b0b0b0b0b0b0b0b0b'}
   */
  upload(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
};
