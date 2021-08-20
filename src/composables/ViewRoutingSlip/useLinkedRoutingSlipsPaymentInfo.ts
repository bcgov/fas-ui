import { Payment } from '@/models/Payment'
import { PaymentMethods } from '@/util/constants'
import { RoutingSlip } from '@/models/RoutingSlip'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState } = routingSlipModule

// Composable function to inject Props, options and values to PaymentDetails component
export default function useLinkedRoutingSlipsPaymentInfo () {
  // vuex action and state
  const { routingSlip } = useState(['routingSlip'])

  /* As per current business rule, a routingslip has one-to-one relation with payment method (Cash/Cheque)
  Therefore, we can determine the payment method of the current routingslip from the first payment record
  making it as a function rather than computed/watch because we can use these following functions to
  return ispaymentcheque, payment objects(cash/cheque) */

  function isPaymentCheque (routingSlipPayments: Payment[]): boolean {
    return routingSlipPayments[0].paymentMethod === PaymentMethods.CHEQUE
  }

  return {
    routingSlip,
    isPaymentCheque
  }
}
