import { GetFeeRequestParams, Payment } from '@/models/Payment'
import { PatchActions, SlipStatus } from '@/util/constants'
import { AxiosResponse } from 'axios'
import CommonUtils from '@/util/common-util'
import ConfigHelper from '@/util/config-helper'
import { LinkRoutingSlipPrams } from '@/models/RoutingSlip'
import axios from '@/util/http-util'

export default class RoutingSlip {
  public static async getRoutingSlip (
    routingNumber: string,
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingNumber}`,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async createRoutingSlip (
    routingSlipRequest: RoutingSlip,
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips`,
      routingSlipRequest,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async adjustRoutingSlip (
    payments: Payment[],
    routingSlipNumber: string
  ): Promise<AxiosResponse> {
    const payload = {
      status: SlipStatus.CORRECTION,
      payments: payments
    }
    return axios.patch(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}?action=${PatchActions.UPDATE_STATUS}`,
      payload
    )
  }

  public static async updateRoutingSlipStatus (
    code: string,
    routingSlipNumber: string
  ): Promise<AxiosResponse> {
    return axios.patch(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}?action=updateStatus`,
      { status: code }
    )
  }

  public static async updateRoutingSlipRefund (
    details: string,
    routingSlipNumber: string
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}/refunds`,
      details
    )
  }

  public static async getSearchRoutingSlip (
    searchParams: RoutingSlip,
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/queries`,
      searchParams,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async saveLinkRoutingSlip (
    LinkRoutingSlip: LinkRoutingSlipPrams,
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/links`,
      LinkRoutingSlip,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async getLinkedRoutingSlips (
    routingSlipNumber: string,
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getFasAPIURL()}/routing-slips/${routingSlipNumber}/links`,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async getDailyReport (
    selectedDate: string,
    type = 'application/pdf',
    showGlobalLoader = false
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
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    return axios.get(
      `${ConfigHelper.getPayAPIURL()}/fees/schedules?description=${searchParams}`,
      { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async getFeeByCorpTypeAndFilingType (
    getFeeRequestParams: GetFeeRequestParams,
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    const requestParams = CommonUtils.createQueryParams(getFeeRequestParams.requestParams)
    return axios.get(
    `${ConfigHelper.getPayAPIURL()}/fees/${getFeeRequestParams.corpTypeCode}/${getFeeRequestParams.filingTypeCode}?${requestParams}`,
    { showGlobalLoader: showGlobalLoader }
    )
  }

  public static async saveManualTransactions (
    transactions: any,
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getPayAPIURL()}/payment-requests`,
      transactions,
      { showGlobalLoader: showGlobalLoader }

    )
  }

  public static async cancelRoutingSlipInvoice (
    invoiceId: number,
    showGlobalLoader = false
  ): Promise<AxiosResponse> {
    return axios.post(
      `${ConfigHelper.getPayAPIURL()}/payment-requests/${invoiceId}/refunds`,
      { showGlobalLoader: showGlobalLoader }
    )
  }
}
