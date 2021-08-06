import { AxiosResponse } from 'axios'
import ConfigHelper from '@/util/config-helper'
import axios from '@/util/http-util'

export default class RoutingSlip {
  public static async getRoutingSlip (
    routingNumber: string,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingNumber}`, { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async createRoutingSlip (
    routingSlipRequest: RoutingSlip,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips`, routingSlipRequest, { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async updateRoutingSlipStatus (
    code: string,
    routingSlipNumber:number
  ): Promise<AxiosResponse> {
    return axios.patch(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}?action=updateStatus`, { status: code })
  }

  public static async getSearchRoutingSlip (
    searchRoutingSlipParams: string,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    // change according to API
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${searchRoutingSlipParams}`, { showGlobalLoader: showGlobalLoader }
    )
  }
}
