import { AxiosResponse } from 'axios'
import ConfigHelper from '@/util/config-helper'
import axios from '@/util/http-util'

export default class RoutingSlip {
  public static async getRoutingSlip (
    routingNumber: string,
    showLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingNumber}`, { showLoader: showLoader }
    )
  }

  public static async createRoutingSlip (
    routingSlipRequest: RoutingSlip,
    showLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips`, routingSlipRequest, { showLoader: showLoader }
    )
  }

  public static async updateRoutingSlipStatus (
    code: string,
    routingSlipNumber:number
  ): Promise<AxiosResponse> {
    return axios.patch(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}?action=updateStatus`, { status: code })
  }
}
