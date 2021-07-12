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

  return {
    isPaymentCheque,
    createRoutingSlipChequePaymentRef,
    createRoutingSlipCashPaymentRef,
    isValid
  }
}
