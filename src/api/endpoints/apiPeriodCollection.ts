import makeRequest from "../apiMakeRequest"
import { TBidInfo, TPeriod } from "../types"

type TGetPeriodCollection = {
    periods: TPeriod[];
    bid_info: TBidInfo;
}

export const getPeriodCollection = async (query: string) => {
    return await makeRequest<TGetPeriodCollection>({
        url: `api/periods/${query}`
    })
}