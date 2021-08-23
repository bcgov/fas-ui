import {
  AccountInfo,
  LinkRoutingSlipPrams,
  LinkedRoutingSlips,
  RoutingSlip,
  RoutingSlipDetails
} from '@/models/RoutingSlip'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

import CommonUtils from '@/util/common-util'
import { Payment } from '@/models/Payment'
import RoutingSlipService from '@/services/routingSlip.services'

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
    return !!this.routingSlip.parentNumber
  }

  // if routingslip has parentNumber then it is a child Else, check if there are any children in linkedroutingslips for it.(in this case, it is a parent)
  public get isRoutingSlipLinked (): boolean {
    return this.isRoutingSlipAChild || this.linkedRoutingSlips?.children.length > 0
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
  public async checkRoutingNumber (): Promise<boolean> {
    const context: any = this.context
    try {
      const routingumber = context.state.routingSlipDetails.number
      const response = await RoutingSlipService.getRoutingSlip(routingumber)
      // if routing number existing we will get 200 as response
      // else we will get 204
      if (response.status === 204) {
        // we will return truw,so can use this routing number
        return true
      }
      // all other case routing is existing so can't use this number
      return false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error ', error.response?.data)
      // on error we return true where the can use this routing number which should brake on create and show error message
      return true
    }
  }

  @Action({ commit: 'setRoutingSlip', rawError: true })
  public async getRoutingSlip (slipId): Promise<RoutingSlipDetails> {
    try {
      const response = await RoutingSlipService.getRoutingSlip(slipId, true)

      if (response && response.data && response.status === 200) {
        return response.data
      }
      // TODO : need to handle if slip not existing
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error ', error.response?.data) // 500 errors may not return data
    }
  }

  @Action({ commit: 'setRoutingSlip', rawError: true })
  public async updateRoutingSlipStatus (
    status: any
  ): Promise<RoutingSlipDetails> {
    const context: any = this.context
    const slipNumber = context.state.routingSlip.number
    // update status
    try {
      const response = await RoutingSlipService.updateRoutingSlipStatus(
        status,
        slipNumber
      )
      if (response && response.data && response.status === 200) {
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

  @Action({ commit: 'setRoutingSlip', rawError: true })
  public async saveLinkRoutingSlip (
    childRoutingSlipNumber: string
  ): Promise<RoutingSlipDetails> {
    const context: any = this.context

    const parentRoutingSlipNumber: string = context.state.routingSlip.number

    const LinkPrams = { childRoutingSlipNumber, parentRoutingSlipNumber }

    // handle error condtions here
    const response = await RoutingSlipService.saveLinkRoutingSlip(LinkPrams)
    if (response && response.data && response.status === 200) {
      return response.data
    }
  }

  @Action({ rawError: true })
  public async getLinkedRoutingSlips (routingSlipNumber): Promise<void> {
    try {
      const response = await RoutingSlipService.getLinkedRoutingSlips(routingSlipNumber, true)
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
}
