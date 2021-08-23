import { computed, ref } from '@vue/composition-api'

import { PaymentMethods } from '@/util/constants'
import { RoutingSlip } from '@/models/RoutingSlip'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useGetters } = routingSlipModule

// Composable function to inject Props, options and values to PaymentInformation component
export default function usePaymentInformation () {
  // UI control variables
  const isExpanded = ref<boolean>(false)

  // vuex getter and state
  const { routingSlip, linkedRoutingSlips } = useState(['routingSlip', 'linkedRoutingSlips'])
  const { isRoutingSlipAChild, isRoutingSlipLinked } = useGetters(['isRoutingSlipAChild', 'isRoutingSlipLinked'])

  // As per current business rule, a routingslip has one-to-one relation with payment method (Cash/Cheque)
  // Therefore, we can determine the payment method of the current routingslip from the first payment record
  const isPaymentCheque = computed(() => {
    const payments = (routingSlip.value as RoutingSlip)?.payments
    // to prevent lazy load
    return payments && payments[0].paymentMethod === PaymentMethods.CHEQUE
  })

  function viewPaymentInformation (): void {
    // expand/collapse view payment information children
    // update the cheque store if payment method is cheque, cash store otherwise
    isExpanded.value = !isExpanded.value
  }

  return {
    routingSlip,
    isExpanded,
    isPaymentCheque,
    linkedRoutingSlips,
    isRoutingSlipAChild,
    isRoutingSlipLinked,
    viewPaymentInformation
  }
}
