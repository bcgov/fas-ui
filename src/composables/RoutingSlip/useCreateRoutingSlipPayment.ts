import { computed, ref } from 'vue'
import { useRoutingSlip } from '../useRoutingSlip'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipPayment () {
  const { isAmountPaidInUsd, isPaymentMethodCheque } = useRoutingSlip()
  const createRoutingSlipChequePaymentRef = ref<HTMLFormElement>(null)
  const createRoutingSlipCashPaymentRef = ref<HTMLFormElement>(null)

  // vuex state and mutations
  // using same v-model value for getting value and update parent on change
  const isPaymentCheque:any = computed({
    get: () => {
      return isPaymentMethodCheque.value
    },
    set: (modalValue: any) => {
      isPaymentMethodCheque.value = modalValue
      // reset the isAmountPaidInUsd flag as we use same state for both payment methods
      isAmountPaidInUsd.value = false
    }
  })

  function isValid (): boolean {
    return isPaymentCheque.value === true ? createRoutingSlipChequePaymentRef.value?.isValid() : createRoutingSlipCashPaymentRef.value?.isValid()
  }

  return {
    isPaymentCheque,
    createRoutingSlipChequePaymentRef,
    createRoutingSlipCashPaymentRef,
    isValid
  }
}
