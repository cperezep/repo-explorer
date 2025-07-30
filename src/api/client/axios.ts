import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // config.headers['X-Api-Key'] = import.meta.env.API_KEY;
  // eslint-disable-next-line no-console
  console.info(`[request] [${JSON.stringify(config)}]`);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  // eslint-disable-next-line no-console
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  // eslint-disable-next-line no-console
  console.info(`[response] [${JSON.stringify(response)}]`);
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  // eslint-disable-next-line no-console
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);

export default axios;
