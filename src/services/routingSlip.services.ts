import { AxiosResponse } from 'axios'
import ConfigHelper from '@/util/config-helper'
import { LinkRoutingSlipPrams } from '@/models/RoutingSlip'
import axios from '@/util/http-util'

export default class RoutingSlip {
  public static async getRoutingSlip (
    routingNumber: string,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingNumber}`,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async createRoutingSlip (
    routingSlipRequest: RoutingSlip,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips`,
      routingSlipRequest,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async updateRoutingSlipStatus (
    code: string,
    routingSlipNumber: number
  ): Promise<AxiosResponse> {
    return axios.patch(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}?action=updateStatus`,
      { status: code }
    )
  }

  public static async getSearchRoutingSlip (
    searchParams: RoutingSlip,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/queries`,
      searchParams,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async saveLinkRoutingSlip (
    LinkRoutingSlip: LinkRoutingSlipPrams,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/links`,
      LinkRoutingSlip,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async getLinkedRoutingSlips (
    routingSlipNumber: string,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}/links`,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async getDailyReport (
    selectedDate: string,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${selectedDate}/reports`,
      {},
      { showGlobalLoader: showGlobalLoader }
    )
  }
}
