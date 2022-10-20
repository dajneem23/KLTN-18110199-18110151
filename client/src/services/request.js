import axiosBase from 'axios';

const axios = axiosBase.create({
  // This is development host
  baseURL: `${process.env.VUE_APP_BASE_URL}/${process.env.VUE_APP_BASE_API_PREFIX}/${process.env.VUE_APP_BASE_API_VERSION}`,
  withCredentials: true,
});

axios.defaults.headers = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  Expires: '0',
};
const catchError = (error) => {
  console.log(`ApiService: ${error}`);
  if (error.response) {
    // Request made and server responded
    return [undefined, error.response.data];
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    return [undefined, error];
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error);
    return [undefined, error];
  }
};
const responseCallback = (res) => {
  return [res.data, undefined];
};
export const RequestBase = {
  query(route, params) {
    return axios.get(`${route}`, { params: params }).then(responseCallback).catch(catchError);
  },
  get(route) {
    return axios.get(`${route}`).then(responseCallback).catch(catchError);
  },
  post(route, body) {
    return axios.post(`${route}`, body).then(responseCallback).catch(catchError);
  },
  put(route, body) {
    return axios.put(`${route}`, body).then(responseCallback).catch(catchError);
  },
  delete(route) {
    return axios.delete(`${route}`).then(responseCallback).catch(catchError);
  },
  patch(route) {
    return axios.patch(`${route}`).then(responseCallback).catch(catchError);
  }
};

export default RequestBase;
