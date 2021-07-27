import {
  AccountInfo,
  RoutingSlip,
  RoutingSlipDetails
} from '@/models/RoutingSlip'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

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
  isPaymentMethodCheque: boolean = undefined

  public get invoiceCount (): number {
    return this.routingSlip?.invoices?.length
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
      routingSlipRequest
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
      console.error('error ', error.response.data)
      // on error we return true where the can use this routing number which should brake on create and show error message
      return true
    }
  }

  @Action({ commit: 'setRoutingSlip', rawError: true })
  public async getRoutingSlip (slipId): Promise<RoutingSlipDetails> {
    try {
      const response = await RoutingSlipService.getRoutingSlip(slipId)

      if (response && response.data && response.status === 200) {
        return response.data
      }
      // TODO : need to handle if slip not existing
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error ', error.response.data)
    }
  }

  @Action({ commit: 'setRoutingSlip', rawError: true })
  public async updateRoutingSlipStatus (status:any): Promise<RoutingSlipDetails> {
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
      console.error('error ', error.response.data)
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
}
