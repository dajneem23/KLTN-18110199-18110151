import { RequestBase } from './request';

export const UploadServices = {
  url: 'upload',
  upload(body) {
    return RequestBase.post(`${this.url}/`, body);
  },
};
