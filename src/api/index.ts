import {Api} from './Api.ts';

export const api = new Api({
  baseURL: 'http://192.168.0.13:8000/api',
  withCredentials: true
});