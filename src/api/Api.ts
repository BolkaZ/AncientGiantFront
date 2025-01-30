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

export interface BidList {
  /**
   * Дата создания
   * @format date-time
   */
  created_at?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  to_form_at?: string | null;
  /**
   * Дата завершения
   * @format date-time
   */
  finished_at?: string | null;
  /**
   * Дата обновления
   * @format date-time
   */
  updated_at?: string;
  /**
   * Комментарий к модератору
   * @minLength 1
   */
  comment: string;
  /** QR код */
  qr?: string | null;
}

export interface AnimalGet {
  /**
   * Название
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * Группа
   * @minLength 1
   * @maxLength 255
   */
  group: string;
  /**
   * Количество найденных окаменелостей особи
   * @min -2147483648
   * @max 2147483647
   */
  quantity_found: number;
}

export interface PeriodForBidFullInfo {
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Image
   * @minLength 1
   */
  image: string;
  animals: AnimalGet[];
  /**
   * Количество найденных окаменелостей особи
   * @min -2147483648
   * @max 2147483647
   */
  quantity_found?: number;
}

export interface Animal {
  /** ID */
  id?: number;
  /**
   * Название
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * Группа
   * @minLength 1
   * @maxLength 255
   */
  group: string;
  /**
   * Количество найденных окаменелостей особи
   * @min -2147483648
   * @max 2147483647
   */
  quantity_found: number;
}

export interface BidGetFullInfo {
  periods: PeriodForBidFullInfo[];
  /**
   * Дата создания
   * @format date-time
   */
  created_at?: string;
  /**
   * Дата формирования
   * @format date-time
   */
  to_form_at?: string | null;
  /**
   * Дата обновления
   * @format date-time
   */
  updated_at?: string;
  /**
   * Дата завершения
   * @format date-time
   */
  finished_at?: string | null;
  /**
   * Комментарий к модератору
   * @minLength 1
   */
  comment: string;
  animal: Animal;
}

export interface BidUpdateInput {
  /**
   * Комментарий к модератору
   * @minLength 1
   */
  comment: string;
}

export interface BidFormInput {
  /**
   * Comment
   * @minLength 1
   */
  comment: string;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Group
   * @minLength 1
   */
  group: string;
}

export interface BidModerationInput {
  /**
   * Status
   * @minLength 1
   */
  status: string;
}

export interface UserLoginInput {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
}

export interface UserList {
  /** ID */
  id?: number;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
}

export interface PeriodInput {
  /**
   * Название периода
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * Описание периода
   * @minLength 1
   */
  detail_text: string;
  /**
   * Начало периода
   * @minLength 1
   * @maxLength 50
   */
  start: string;
  /**
   * Окончание периода
   * @minLength 1
   * @maxLength 50
   */
  end: string;
}

export interface PeriodGetSerializers {
  /** ID */
  id?: number;
  /**
   * Название периода
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * Описание периода
   * @minLength 1
   */
  detail_text: string;
  /**
   * Начало периода
   * @minLength 1
   * @maxLength 50
   */
  start: string;
  /**
   * Окончание периода
   * @minLength 1
   * @maxLength 50
   */
  end: string;
  /**
   * Изображение периода
   * @format uri
   * @minLength 1
   * @maxLength 500
   */
  image: string;
  animals: AnimalGet[];
}

export interface PeriodUpdateInput {
  /**
   * Название периода
   * @minLength 1
   * @maxLength 255
   */
  name: string;
  /**
   * Описание периода
   * @minLength 1
   */
  detail_text: string;
  /**
   * Начало периода
   * @minLength 1
   * @maxLength 50
   */
  start: string;
  /**
   * Окончание периода
   * @minLength 1
   * @maxLength 50
   */
  end: string;
  /** Is active */
  is_active: boolean;
}

export interface UserCreateInput {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
}

export interface UserUpdateInput {
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password?: string;
}

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
     * @description Запрос на получение списка заявок.
     *
     * @tags bids
     * @name BidList
     * @request GET:/bids/
     * @secure
     */
    bidList: (
      query?: {
        status?: string;
        /** @pattern 2024-12-16T18:14:57.834351Z */
        date_start?: string;
        /** @pattern 2024-12-17T18:14:57.834351Z */
        date_end?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BidList[],
        {
          /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
          detail?: string;
        }
      >({
        path: `/bids/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на добавление периода в заявку.
     *
     * @tags bids
     * @name PeriodInBidCreate
     * @request POST:/bids/periods/{period_id}/
     * @secure
     */
    periodInBidCreate: (
      periodId: string,
      data: {
        bid_id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BidGetFullInfo,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/bids/periods/${periodId}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на обновление периода из заявки.
     *
     * @tags bids
     * @name PeriodInBidUpdate
     * @request PUT:/bids/periods/{period_id}/
     * @secure
     */
    periodInBidUpdate: (
      periodId: string,
      data: {
        bid_id: number;
        quantity_found: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        BidGetFullInfo,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/bids/periods/${periodId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на удаление периода из заявки.
     *
     * @tags bids
     * @name PeriodInBidDelete
     * @request DELETE:/bids/periods/{period_id}/
     * @secure
     */
    periodInBidDelete: (
      periodId: string,
      data: {
        bid_id: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        void,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/bids/periods/${periodId}/`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * @description Запрос на получение детальной информации о заявке.
     *
     * @tags bids
     * @name BidGet
     * @request GET:/bids/{bid_id}/
     * @secure
     */
    bidGet: (bidId: string, params: RequestParams = {}) =>
      this.request<
        BidGetFullInfo,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/bids/${bidId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на обновление заявки.
     *
     * @tags bids
     * @name BidUpdate
     * @request PUT:/bids/{bid_id}/
     * @secure
     */
    bidUpdate: (bidId: string, data: BidUpdateInput, params: RequestParams = {}) =>
      this.request<
        BidGetFullInfo,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/bids/${bidId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на удаление заявки.
     *
     * @tags bids
     * @name BidDelete
     * @request DELETE:/bids/{bid_id}/
     * @secure
     */
    bidDelete: (bidId: string, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/bids/${bidId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Запрос на формирование заявки.
     *
     * @tags bids
     * @name BidForm
     * @request PUT:/bids/{bid_id}/form/
     * @secure
     */
    bidForm: (bidId: string, data: BidFormInput, params: RequestParams = {}) =>
      this.request<
        BidGetFullInfo,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/bids/${bidId}/form/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на модерацию заявки.
     *
     * @tags bids
     * @name BidModeration
     * @request PUT:/bids/{bid_id}/moderation/
     * @secure
     */
    bidModeration: (bidId: string, data: BidModerationInput, params: RequestParams = {}) =>
      this.request<
        BidList,
        | {
            /** @example "Status must be REJECTED or FINISHED." */
            detail?: string;
          }
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/bids/${bidId}/moderation/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * @description Запрос на авторизацию пользователя.
     *
     * @tags login
     * @name UserLogin
     * @request POST:/login/
     * @secure
     */
    userLogin: (data: UserLoginInput, params: RequestParams = {}) =>
      this.request<
        UserList,
        {
          /** @example "Invalid credentianls." */
          detail?: string;
        }
      >({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  logout = {
    /**
     * @description Запрос на деавторизацию пользователя.
     *
     * @tags logout
     * @name UserLogout
     * @request POST:/logout/
     * @secure
     */
    userLogout: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "success" */
          detail?: string;
        },
        {
          /** @example "You must authorize before." */
          detail?: string;
        }
      >({
        path: `/logout/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  periods = {
    /**
     * @description Запрос на получение списка периодов.
     *
     * @tags periods
     * @name PeriodList
     * @request GET:/periods/
     * @secure
     */
    periodList: (
      query?: {
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          periods: {
            id: number;
            name: string;
            start: string;
            end: string;
            image: string;
          }[];
          bid_info: {
            bid_id?: number;
            count_of_periods?: number;
            detail?: string;
          };
        },
        {
          /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
          detail?: string;
        }
      >({
        path: `/periods/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на создание периода.
     *
     * @tags periods
     * @name PeriodCreate
     * @request POST:/periods/
     * @secure
     */
    periodCreate: (data: PeriodInput, params: RequestParams = {}) =>
      this.request<
        PeriodGetSerializers,
        {
          /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
          detail?: string;
        }
      >({
        path: `/periods/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Выводит детальную информацию о периооде.
     *
     * @tags periods
     * @name PeriodGet
     * @request GET:/periods/{period_id}/
     * @secure
     */
    periodGet: (periodId: string, params: RequestParams = {}) =>
      this.request<
        PeriodGetSerializers,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/periods/${periodId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на обновление периода.
     *
     * @tags periods
     * @name PeriodUpdate
     * @request PUT:/periods/{period_id}/
     * @secure
     */
    periodUpdate: (periodId: string, data: PeriodUpdateInput, params: RequestParams = {}) =>
      this.request<
        PeriodGetSerializers,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/periods/${periodId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на удаление периода.
     *
     * @tags periods
     * @name PeriodDelete
     * @request DELETE:/periods/{period_id}/
     * @secure
     */
    periodDelete: (periodId: string, params: RequestParams = {}) =>
      this.request<
        void,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/periods/${periodId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Запрос на добавление изображения к периоду.
     *
     * @tags periods
     * @name PeriodImageCreate
     * @request POST:/periods/{period_id}/images/
     * @secure
     */
    periodImageCreate: (
      periodId: string,
      data: {
        /** @format binary */
        image: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @example "Success" */
          message?: string;
        },
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/periods/${periodId}/images/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * @description Запрос на регистрацию пользователя.
     *
     * @tags users
     * @name UserRegister
     * @request POST:/users/
     * @secure
     */
    userRegister: (data: UserCreateInput, params: RequestParams = {}) =>
      this.request<UserList, any>({
        path: `/users/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Запрос на обновление пользователя.
     *
     * @tags users
     * @name UserUpdate
     * @request PUT:/users/{user_id}/
     * @secure
     */
    userUpdate: (userId: string, data: UserUpdateInput, params: RequestParams = {}) =>
      this.request<
        UserList,
        | {
            /** @example "Ты не авторизовался!/Ты не модератор!/Ты не создатель!" */
            detail?: string;
          }
        | {
            /** @example "No Objects matches the given query." */
            detail?: string;
          }
      >({
        path: `/users/${userId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
