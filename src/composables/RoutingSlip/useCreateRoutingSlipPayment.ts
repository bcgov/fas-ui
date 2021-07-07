import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipPayment () {
  const createRoutingSlipPaymentForm = ref<HTMLFormElement>()
  const isPaymentCheque = ref(true)
  const createRoutingSlipChequePaymentRef = ref<HTMLFormElement>()
  const createRoutingSlipCashPaymentRef = ref<HTMLFormElement>()

  return {
    createRoutingSlipPaymentForm,
    isPaymentCheque,
    createRoutingSlipChequePaymentRef,
    createRoutingSlipCashPaymentRef
  }
}
