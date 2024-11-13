import { useRoutingSlip } from '../useRoutingSlip'

// Composable function to inject Props, options and values to reviewRoutingSlip component
export function useReviewRoutingSlip () {
  const {
    accountInfo,
    cashPayment,
    chequePayment,
    isAmountPaidInUsd,
    isPaymentMethodCheque,
    routingSlipDetails,
    routingSlipAddress
  } = useRoutingSlip()
  return {
    routingSlipDetails,
    routingSlipAddress,
    chequePayment,
    accountInfo,
    cashPayment,
    isPaymentMethodCheque,
    isAmountPaidInUsd
  }
}
