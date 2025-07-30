import type { AxiosResponse, Method } from 'axios';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

function request<T>(method: Method, url: string, data?: unknown): Promise<AxiosResponse<T>> {
  return axios.request<T>({ method, url, data });
}

export default request;
