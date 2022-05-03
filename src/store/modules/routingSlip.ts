import {
  AccountInfo,
  GetRoutingSlipRequestPayload,
  LinkedRoutingSlips,
  RoutingSlip,
  RoutingSlipDetails
} from '@/models/RoutingSlip'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import {
  BusinessInfo,
  FilingType,
  GetFeeRequestParams,
  Payment,
  TransactionParams
} from '@/models/Payment'

import CommonUtils from '@/util/common-util'
import RoutingSlipService from '@/services/routingSlip.services'
import { ApiErrors, CreateRoutingSlipStatus, SlipStatus } from '@/util/constants'

@Module({ namespaced: true, stateFactory: true })
export default class RoutingSlipModule extends VuexModule {
  routingSlipDetails: RoutingSlipDetails = {}
  accountInfo: AccountInfo = {}
  chequePayment: Payment[] = []
  cashPayment: Payment = {}
  routingSlip: RoutingSlip = {}
  // default the payment type of routing slip to cheque
  isPaymentMethodCheque: boolean = true

  searchRoutingSlipParams: any = {}
  searchRoutingSlipResult: RoutingSlip[] = []
  // using for auto cpmplete RoutingSlip values
  autoCompleteRoutingSlips: RoutingSlip[] = []

  linkedRoutingSlips: LinkedRoutingSlips = undefined
  headerSearchTitle:any = [
    {
      text: 'Routing Slip Number',
      align: 'start',
      value: 'routingSlipNumber',
      display: true,
      className: 'routing-slip'
    },
    {
      text: 'Receipt Number',
      align: 'start',
      sortable: false,
      value: 'receiptNumber',
      display: true,
      className: 'receiptNumber'
    },
    {
      text: 'Entity Number',
      align: 'start',
      value: 'accountName',
      sortable: false,
      display: false,
      className: 'accountName'
    },
    {
      text: 'Created By',
      align: 'start',
      value: 'createdName',
      sortable: false,
      display: false,
      className: 'createdName'
    },
    {
      text: 'Date',
      align: 'start',
      sortable: false,
      value: 'date',
      display: true,
      className: 'date'
    },
    {
      text: 'Status',
      align: 'start',
      sortable: false,
      value: 'status',
      display: true,
      className: 'status'
    },
    {
      text: 'Reference Number',
      align: 'start',
      value: 'businessIdentifier',
      sortable: false,
      display: true,
      className: 'businessIdentifier'
    },
    {
      text: 'Cheque Number',
      align: 'start',
      value: 'chequeReceiptNumber',
      sortable: false,
      display: false,
      className: 'cheque-receipt-number'
    },
    {
      text: 'Balance',
      align: 'right',
      value: 'remainingAmount',
      sortable: false,
      display: true,
      className: 'remainingAmount'
    },
    {
      text: 'Actions',
      align: 'start',
      value: '',
      sortable: false,
      display: true,
      hideInSearchColumnFilter: true,
      className: 'action'
    }
  ]

  // used for USD to CAD conversion
  isAmountPaidInUsd: boolean = false

  public get invoiceCount (): number {
    return this.routingSlip?.invoices?.length
  }

  public get searchParamsExist (): boolean {
    const params = this.searchRoutingSlipParams
    for (const key in params) {
      if (params[key] && params[key] !== '') {
        return false
      }
    }
    return true
  }

  // for a child linked to a parent routing slip, there would be a parentNumber
  public get isRoutingSlipAChild (): boolean {
    return !!this.routingSlip?.parentNumber
  }

  // if routingslip has parentNumber then it is a child Else, check if there are any children in linkedroutingslips for it.(in this case, it is a parent)
  public get isRoutingSlipLinked (): boolean {
    return (
      this.isRoutingSlipAChild || this.linkedRoutingSlips?.children.length > 0
    )
  }

  @Mutation
  public setRoutingSlipDetails (routingSlipDetails: RoutingSlipDetails) {
    this.routingSlipDetails = routingSlipDetails
  }

  @Mutation
  public setAccountInfo (accountInfo: AccountInfo) {
    this.accountInfo = accountInfo
  }

  @Mutation
  public setChequePayment (chequeDetails: Payment[]) {
    this.chequePayment = chequeDetails
  }

  @Mutation
  public setCashPayment (cashPayment: Payment) {
    this.cashPayment = cashPayment
  }

  @Mutation
  public setRoutingSlip (routingSlip: RoutingSlip) {
    this.routingSlip = routingSlip
  }

  @Mutation
  public setIsPaymentMethodCheque (isPaymentMethodCheque: boolean) {
    this.isPaymentMethodCheque = isPaymentMethodCheque
  }

  @Mutation
  public setSearchRoutingSlipParams (searchRoutingSlip: RoutingSlipDetails) {
    this.searchRoutingSlipParams = searchRoutingSlip
  }

  @Mutation
  public setSearchRoutingSlipResult (searchRoutingSlip: RoutingSlipDetails[]) {
    this.searchRoutingSlipResult = searchRoutingSlip
  }

  @Mutation
  public setAutoCompleteRoutingSlips (
    autoCompleteRoutingSlips: RoutingSlipDetails[]
  ) {
    this.autoCompleteRoutingSlips = autoCompleteRoutingSlips
  }

  @Mutation
  public setLinkedRoutingSlips (linkedRoutingSlips: LinkedRoutingSlips) {
    this.linkedRoutingSlips = linkedRoutingSlips
  }

  @Mutation
  public setIsAmountPaidInUsd (isAmountPaidInUsd: boolean) {
    this.isAmountPaidInUsd = isAmountPaidInUsd
  }

  @Mutation
  public setSearchHeaders (headers: any) {
    this.headerSearchTitle = headers
  }

  @Action({ commit: 'setRoutingSlip', rawError: true })
  public async createRoutingSlip (): Promise<RoutingSlipDetails> {
    const context: any = this.context
    // build the RoutingSlip Request JSON object that needs to be sent.
    let routingSlipRequest: RoutingSlip = {}
    routingSlipRequest = { ...context.state.routingSlipDetails }
    routingSlipRequest.paymentAccount = context.state.accountInfo

    // By design, a routing slip can only have one payment method - CASH or CHEQUE.
    routingSlipRequest.payments = context.state.isPaymentMethodCheque
      ? context.state.chequePayment
      : [context.state.cashPayment]

    const response = await RoutingSlipService.createRoutingSlip(
      routingSlipRequest,
      true
    )
    if (response && response.data && response.status === 200) {
      return response.data
    }
  }

  @Action({ rawError: true })
  public async checkRoutingNumber (): Promise<CreateRoutingSlipStatus> {
    const context: any = this.context
    try {
      const routingNumber = context.state.routingSlipDetails.number
      const response = await RoutingSlipService.getRoutingSlip(routingNumber)
      // if routing number existing we will get 200 as response
      // else we will get 204
      if (response.status === 204) {
        return CreateRoutingSlipStatus.VALID
      }
      // all other case routing is existing so can't use this number
      return CreateRoutingSlipStatus.EXISTS
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.type === ApiErrors.FAS_INVALID_ROUTING_SLIP_DIGITS) {
        return CreateRoutingSlipStatus.INVALID_DIGITS
      }

      // eslint-disable-next-line no-console
      console.error('error ', error.response?.data)
      // on error we allow the routing number which should break on create and show error message
      return CreateRoutingSlipStatus.VALID
    }
  }

  @Action({ commit: 'setRoutingSlip', rawError: true })
  public async getRoutingSlip (
    getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload
  ): Promise<RoutingSlipDetails> {
    try {
      const response = await RoutingSlipService.getRoutingSlip(
        getRoutingSlipRequestPayload.routingSlipNumber,
        getRoutingSlipRequestPayload?.showGlobalLoader
      )

      if (response && response.data && response.status === 200) {
        return response.data
      }
      // TODO : need to handle if slip not existing
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error ', error.response?.data) // 500 errors may not return data
    }
  }

  @Action({ rawError: true })
  public async updateRoutingSlipStatus (
    statusDetails: any
  ): Promise<RoutingSlipDetails> {
    const context: any = this.context
    const slipNumber = context.state.routingSlip.number

    // update status
    try {
      let response
      if (CommonUtils.isRefundProcessStatus(statusDetails?.status)) {
        response = await RoutingSlipService.updateRoutingSlipRefund(
          statusDetails,
          slipNumber
        )
      } else {
        response = await RoutingSlipService.updateRoutingSlipStatus(
          statusDetails.status,
          slipNumber
        )
      }
      if (response && response.data && (response.status === 200 || response.status === 202)) {
        if (!CommonUtils.isRefundProcessStatus(statusDetails?.status)) {
          context.commit('setRoutingSlip', response.data)
        } else {
          const getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload = { routingSlipNumber: slipNumber }
          context.dispatch('getRoutingSlip', getRoutingSlipRequestPayload)
        }
        return response.data
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error ', error.response?.data)
    }
  }

  @Action({ rawError: true })
  public resetRoutingSlipDetails (): void {
    const context: any = this.context
    context.commit('setRoutingSlipDetails', undefined)
    context.commit('setAccountInfo', undefined)
    context.commit('setChequePayment', [])
    context.commit('setCashPayment', [])
    context.commit('setIsPaymentMethodCheque', undefined)
  }

  @Action({ rawError: true })
  public resetSearchParams (): void {
    const context: any = this.context
    context.commit('setSearchRoutingSlipParams', {})
    context.commit('setSearchRoutingSlipResult', [])
  }

  @Action({ commit: 'setSearchRoutingSlipResult', rawError: true })
  public async searchRoutingSlip (): Promise<RoutingSlipDetails[]> {
    const context: any = this.context
    // // build the RoutingSlip Request JSON object that needs to be sent.

    let searchRoutingSlipParams = { ...context.state.searchRoutingSlipParams }
    // filtering and removing all non set values
    searchRoutingSlipParams = CommonUtils.cleanObject(searchRoutingSlipParams)

    // formatting as per API
    if (searchRoutingSlipParams.dateFilter) {
      searchRoutingSlipParams.dateFilter = {
        startDate: CommonUtils.formatDisplayDate(
          searchRoutingSlipParams.dateFilter[0],
          'YYYY-MM-DD'
        ),
        endDate: CommonUtils.formatDisplayDate(
          searchRoutingSlipParams.dateFilter[1],
          'YYYY-MM-DD'
        )
      }
    }

    // check for error handling
    if (searchRoutingSlipParams.status) {
      searchRoutingSlipParams.status = searchRoutingSlipParams.status.code
    }
    // for time being setting limit to avoid overloading
    searchRoutingSlipParams.page = 1
    searchRoutingSlipParams.limit = 50

    if (Object.keys(searchRoutingSlipParams).length > 0) {
      // need to reset result of there is no search params
      const response = await RoutingSlipService.getSearchRoutingSlip(
        searchRoutingSlipParams
      )
      if (response && response.data && response.status === 200) {
        return response.data?.items
      }
    }
    return []
  }

  @Action({ commit: 'setAutoCompleteRoutingSlips', rawError: true })
  public async getAutoCompleteRoutingSlips (
    routingSlipNumber
  ): Promise<RoutingSlipDetails[]> {
    const response = await RoutingSlipService.getSearchRoutingSlip({
      routingSlipNumber
    })
    if (response && response.data && response.status === 200) {
      return response.data?.items
    }

    return []
  }

  @Action({ rawError: true })
  public async saveLinkRoutingSlip (
    parentRoutingSlipNumber: string
  ): Promise<any> {
    const context: any = this.context

    const childRoutingSlipNumber: string = context.state.routingSlip.number

    const LinkPrams = { childRoutingSlipNumber, parentRoutingSlipNumber }

    try {
      // handle error condtions here
      const response = await RoutingSlipService.saveLinkRoutingSlip(LinkPrams)
      if (response && response.data && response.status === 200) {
        return {
          error: false
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        return { error: true, details: error.response?.data }
      }

      // eslint-disable-next-line no-console
      console.error('error ', error.response?.data)
    }
  }

  @Action({ rawError: true })
  public async getLinkedRoutingSlips (routingSlipNumber): Promise<void> {
    try {
      const response = await RoutingSlipService.getLinkedRoutingSlips(
        routingSlipNumber,
        true
      )
      const context: any = this.context
      let linkedRoutingSlips: LinkedRoutingSlips
      if (response && response.data && response.status === 200) {
        linkedRoutingSlips = response.data
      }
      // 204 non content response
      context.commit('setLinkedRoutingSlips', linkedRoutingSlips)
    } catch (error) {
      this.context.commit('setLinkedRoutingSlips', undefined)
      // eslint-disable-next-line no-console
      console.error('error ', error.response?.data) // 500 errors may not return data
    }
  }

  @Action({ rawError: true })
  public async getDailyReportByDate (selectedDate, type): Promise<any> {
    const formatedDate = CommonUtils.formatDisplayDate(
      selectedDate,
      'YYYY-MM-DD'
    )
    try {
      return await RoutingSlipService.getDailyReport(formatedDate, type, false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error ', error.response?.data) // 500 errors may not return data
      return error.response
    }
  }

  @Action({ rawError: true })
  public async getAutoCompleteFilingTypes (
    searchParams: string
  ): Promise<FilingType[]> {
    const response = await RoutingSlipService.getSearchFilingType(searchParams)
    if (response && response.data && response.status === 200) {
      return response.data?.items
    }
    return []
  }

  @Action({ rawError: true })
  public async getFeeByCorpTypeAndFilingType (
    getFeeRequestParams: GetFeeRequestParams
  ): Promise<number> {
    // Currently, in FAS we only need total from the result that is the source of truth.
    // Other properties such as tax breakdown and priority fees can be ignored here.
    const response = await RoutingSlipService.getFeeByCorpTypeAndFilingType(
      getFeeRequestParams
    )
    if (response && response.data && response.status === 200) {
      return response.data?.total
    }
    return null
  }

  @Action({ rawError: true })
  public async saveManualTransactions (transation: any): Promise<any> {
    // prepare format from here
    const context: any = this.context

    const routingSlipNumber: string = context.state.routingSlip.number

    const {
      referenceNumber,
      filingType,
      futureEffective,
      priority,
      quantity
    } = transation
    const businessInfo: BusinessInfo = {
      corpType: filingType.corpTypeCode.code
    }

    // no need to pass if empty
    if (referenceNumber) {
      businessInfo.businessIdentifier = referenceNumber
    }

    const transactionParams: TransactionParams = {
      businessInfo,
      filingInfo: {
        filingTypes: [
          {
            filingTypeCode: filingType.filingTypeCode.code,
            futureEffective: futureEffective,
            priority: priority,
            quantity: parseInt(quantity)
          }
        ]
      },
      accountInfo: {
        routingSlip: routingSlipNumber
      }
    }

    const response = await RoutingSlipService.saveManualTransactions(
      transactionParams
    )
    return response
  }

  @Action({ rawError: true })
  public async cancelRoutingSlipInvoice (invoiceId: number): Promise<any> {
    return await RoutingSlipService.cancelRoutingSlipInvoice(invoiceId)
  }
}
