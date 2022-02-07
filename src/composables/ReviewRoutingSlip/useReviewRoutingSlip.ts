import { computed } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState } = routingSlipModule

// Composable function to inject Props, options and values to reviewRoutingSlip component
export function useReviewRoutingSlip () {
  // store
  const { routingSlipDetails, chequePayment, accountInfo, cashPayment, isPaymentMethodCheque, isAmountPaidInUsd } =
  useState(['routingSlipDetails', 'chequePayment', 'accountInfo', 'cashPayment', 'isPaymentMethodCheque', 'isAmountPaidInUsd'])

  return {
    routingSlipDetails,
    chequePayment,
    accountInfo,
    cashPayment,
    isPaymentMethodCheque,
    isAmountPaidInUsd
  }
}
