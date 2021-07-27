import { ComputedRef, computed, ref, watch } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { Payment } from '@/models/Payment'
import { PaymentMethods } from '@/util/constants'
import { RoutingSlip } from '@/models/RoutingSlip'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useMutations } = routingSlipModule

// Composable function to inject Props, options and values to PaymentInformation component
export default function usePaymentInformation () {
  // UI control variables
  const isExpanded = ref<boolean>(false)

  // vuex action and state
  const { routingSlip } = useState(['routingSlip'])
  const { setChequePayment, setCashPayment } = useMutations(['setChequePayment', 'setCashPayment'])

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
    if (isPaymentCheque.value === true && isExpanded.value === true && routingSlip.value?.payments) {
      // format the cheque payment date from backend
      // we are making a copy so as to prevent vuex mutation error
      let chequePayments: Payment[] = JSON.parse(JSON.stringify(routingSlip.value?.payments))
      chequePayments = chequePayments.map((cheque: Payment) => {
        cheque.paymentDate = cheque.paymentDate ? CommonUtils.formatDisplayDate(new Date(cheque.paymentDate)) : ''
        cheque.paidAmount = cheque.paidAmount && (cheque.paidAmount as any).toFixed(2)
        return cheque
      })
      setChequePayment(chequePayments)
    } else {
      // first row in case of cash, since a routing slip has only one record of cash payment
      const cashPayments: Payment = JSON.parse(JSON.stringify(routingSlip.value?.payments[0]))
      cashPayments.paidAmount = cashPayments.paidAmount && (cashPayments.paidAmount as any).toFixed(2)
      setCashPayment(cashPayments)
    }
  }

  return {
    routingSlip,
    isPaymentCheque,
    isExpanded,
    viewPaymentInformation
  }
}
