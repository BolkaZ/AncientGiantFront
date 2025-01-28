/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000/api" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Paleo Project
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000/api
 * @contact <my_email@snmy_emailippets.local>
 *
 * Документация для проекта - Paleo Project.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  bids = {
    /**
     * No description
     *
     * @tags bids
     * @name BidsList
     * @request GET:/bids/
     * @secure
     */
    bidsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bids
     * @name BidsPeriodsCreate
     * @request POST:/bids/periods/{period_id}/
     * @secure
     */
    bidsPeriodsCreate: (periodId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/periods/${periodId}/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bids
     * @name BidsPeriodsUpdate
     * @request PUT:/bids/periods/{period_id}/
     * @secure
     */
    bidsPeriodsUpdate: (periodId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/periods/${periodId}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bids
     * @name BidsPeriodsDelete
     * @request DELETE:/bids/periods/{period_id}/
     * @secure
     */
    bidsPeriodsDelete: (periodId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/periods/${periodId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bids
     * @name BidsRead
     * @request GET:/bids/{bid_id}/
     * @secure
     */
    bidsRead: (bidId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/${bidId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bids
     * @name BidsUpdate
     * @request PUT:/bids/{bid_id}/
     * @secure
     */
    bidsUpdate: (bidId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/${bidId}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bids
     * @name BidsDelete
     * @request DELETE:/bids/{bid_id}/
     * @secure
     */
    bidsDelete: (bidId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/${bidId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bids
     * @name BidsFormUpdate
     * @request PUT:/bids/{bid_id}/form/
     * @secure
     */
    bidsFormUpdate: (bidId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/${bidId}/form/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags bids
     * @name BidsModerationUpdate
     * @request PUT:/bids/{bid_id}/moderation/
     * @secure
     */
    bidsModerationUpdate: (bidId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/bids/${bidId}/moderation/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/login/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  logout = {
    /**
     * No description
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  periods = {
    /**
     * No description
     *
     * @tags periods
     * @name PeriodsList
     * @request GET:/periods/
     * @secure
     */
    periodsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/periods/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags periods
     * @name PeriodsCreate
     * @request POST:/periods/
     * @secure
     */
    periodsCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/periods/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags periods
     * @name PeriodsRead
     * @request GET:/periods/{period_id}/
     * @secure
     */
    periodsRead: (periodId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/periods/${periodId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags periods
     * @name PeriodsUpdate
     * @request PUT:/periods/{period_id}/
     * @secure
     */
    periodsUpdate: (periodId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/periods/${periodId}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags periods
     * @name PeriodsDelete
     * @request DELETE:/periods/{period_id}/
     * @secure
     */
    periodsDelete: (periodId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/periods/${periodId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags periods
     * @name PeriodsImagesCreate
     * @request POST:/periods/{period_id}/images/
     * @secure
     */
    periodsImagesCreate: (periodId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/periods/${periodId}/images/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags users
     * @name UsersCreate
     * @request POST:/users/
     * @secure
     */
    usersCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/{user_id}/
     * @secure
     */
    usersUpdate: (userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${userId}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
}
