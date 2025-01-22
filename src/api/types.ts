import { AxiosResponse } from "axios";

export type APIResponse<Type> = Promise<AxiosResponse<Type> | APIError>;

export type APIError = {
    errors: {
      [key: string]: string[];
    };
    status: number;
};
  

export type TPeriod = {
    id: number,
    name: string,
    start: string,
    end: string,
    image: string | null
}

export type TPeriodDetails = TPeriod & {
    detail_text: string;
}

export type TBidInfo = {
    bid_id: number;
    count_of_periods: number;
}