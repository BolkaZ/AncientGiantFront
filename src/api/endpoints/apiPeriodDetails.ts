import makeRequest from "../apiMakeRequest"
import { TPeriodDetails } from "../types"

type TGetPeriodDetails = TPeriodDetails

export const getPeriodDetails = async (id: string | number) => {
    return await makeRequest<TGetPeriodDetails>({
        url: `api/periods/${id}/`
    })
}