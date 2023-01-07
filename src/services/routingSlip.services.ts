import { AxiosResponse } from 'axios'
import CommonUtils from '@/util/common-util'
import ConfigHelper from '@/util/config-helper'
import { GetFeeRequestParams } from '@/models/Payment'
import { LinkRoutingSlipPrams } from '@/models/RoutingSlip'
import axios from '@/util/http-util'
import { CreateRoutingSlipStatus, PatchActions, SlipStatus } from '@/util/constants'

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

  public static async adjustRoutingSlip (
    routingSlipRequest: Array<object>,
    routingSlipNumber: string
  ): Promise<AxiosResponse> {
    const payload = {
      status: SlipStatus.CORRECTION,
      payments: routingSlipRequest
    }
    return axios.patch(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}?action=${PatchActions.UPDATE_STATUS}`,
      payload
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

  public static async updateRoutingSlipRefund (
    details: string,
    routingSlipNumber: number
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}/refunds`,
      details
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
    type: string = 'application/pdf',
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    const headers = {
      Accept: type
    }
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${selectedDate}/reports`,
      {},
      {
        headers,
        responseType: 'blob' as 'json',
        showGlobalLoader: showGlobalLoader
      }
    )
  }

  public static async getSearchFilingType (
    searchParams: string,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getPayAPIURL()}/fees/schedules?description=${searchParams}`,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async getFeeByCorpTypeAndFilingType (
    getFeeRequestParams: GetFeeRequestParams,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    const requestParams = CommonUtils.createQueryParams(getFeeRequestParams.requestParams)
    return axios.get(
    `${ConfigHelper.getPayAPIURL()}/fees/${getFeeRequestParams.corpTypeCode}/${getFeeRequestParams.filingTypeCode}?${requestParams}`,
    { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async saveManualTransactions (
    transactions: any,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getPayAPIURL()}/payment-requests`,
      transactions,
      { showGlobalLoader: showGlobalLoader }

    )
  }

  public static async cancelRoutingSlipInvoice (
    invoiceId: number,
    showGlobalLoader: boolean = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getPayAPIURL()}/payment-requests/${invoiceId}/refunds`,
      { showGlobalLoader: showGlobalLoader }
    )
  }
}
