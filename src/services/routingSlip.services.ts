import { AxiosResponse } from 'axios'
import ConfigHelper from '@/util/config-helper'
import axios from '@/util/http-util'

export default class RoutingSlip {
  public static async getRoutingSlip (
    routingNumber: string
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingNumber}`
    )
  }

  public static async createRoutingSlip (
    routingSlipRequest: RoutingSlip
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips`, routingSlipRequest
    )
  }
}
