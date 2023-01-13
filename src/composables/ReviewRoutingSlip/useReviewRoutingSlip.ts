import { accountInfo, cashPayment, chequePayment, isAmountPaidInUsd, isPaymentMethodCheque, routingSlipDetails } from '../state'

// Composable function to inject Props, options and values to reviewRoutingSlip component
export function useReviewRoutingSlip () {
  return {
    routingSlipDetails,
    chequePayment,
    accountInfo,
    cashPayment,
    isPaymentMethodCheque,
    isAmountPaidInUsd
  }
}
