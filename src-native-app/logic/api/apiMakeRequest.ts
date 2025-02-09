
import axios, { AxiosRequestConfig } from 'axios';

import { APIResponse } from './types';

const makeRequest = <Type>({
  url = '/',
  method = 'GET',
  headers = {},
  params = {},
  data = {},
  responseType = 'json',
}: AxiosRequestConfig): APIResponse<Type> => {
  url = `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/${url}`;

  return axios
    .request<Type>({
      url,
      method,
      headers,
      params,
      data,
      responseType,
    })
    .catch((errors) => {
      const responseErrors = errors.response?.data?.errors;
      const status = errors?.response?.status as number;     

      return { errors: responseErrors, status };
    });
};

export default makeRequest;
