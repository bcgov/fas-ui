import { useRoutingSlip } from '../useRoutingSlip'

// Composable function to inject Props, options and values to reviewRoutingSlip component
export function useReviewRoutingSlip () {
  const {
    accountInfo,
    cashPayment,
    chequePayment,
    isAmountPaidInUsd,
    isPaymentMethodCheque,
    routingSlipDetails
  } = useRoutingSlip()
  return {
    routingSlipDetails,
    chequePayment,
    accountInfo,
    cashPayment,
    isPaymentMethodCheque,
    isAmountPaidInUsd
  }
}
