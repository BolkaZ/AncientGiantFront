import {Api} from './Api.ts';

export const api = new Api({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true
});