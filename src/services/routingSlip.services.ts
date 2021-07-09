import { AxiosResponse } from 'axios'
import ConfigHelper from '@/util/config-helper'
import axios from '@/util/http-util'

export default class RoutingSlip {
  public static async isRoutingNumberAvailable (
    routingNumber: string
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingNumber}`
    )
  }
}
