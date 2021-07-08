import { Payment } from '@/models/Payment'
import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipPayment () {
  // default the payment type of routing slip to cheque
  const isPaymentCheque = ref<boolean>(true)
  const createRoutingSlipChequePaymentRef = ref<HTMLFormElement>(null)
  const createRoutingSlipCashPaymentRef = ref<HTMLFormElement>(null)

  function isValid (): boolean {
    return isPaymentCheque.value ? createRoutingSlipChequePaymentRef.value?.isValid() : createRoutingSlipCashPaymentRef.value?.isValid()
  }

  function getRoutingSlipPaymentInput (): Payment {
    let payment: Payment = null
    if (isPaymentCheque.value) {
      payment = createRoutingSlipChequePaymentRef.value?.getRoutingSlipChequesInput()
    } else {
      payment = createRoutingSlipCashPaymentRef.value?.getRoutingSlipCashInput()
    }
    return payment
  }

  return {
    isPaymentCheque,
    createRoutingSlipChequePaymentRef,
    createRoutingSlipCashPaymentRef,
    isValid,
    getRoutingSlipPaymentInput
  }
}
