import { computed, onMounted, ref, watch } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useMutations } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipPayment () {
  const createRoutingSlipChequePaymentRef = ref<HTMLFormElement>(null)
  const createRoutingSlipCashPaymentRef = ref<HTMLFormElement>(null)

  // vuex state and mutations
  const { isPaymentMethodCheque } = useState(['isPaymentMethodCheque', 'isAmountPaidInUsd'])
  const { setIsPaymentMethodCheque, setIsAmountPaidInUsd } = useMutations(['setIsPaymentMethodCheque', 'setIsAmountPaidInUsd'])

  // using same v-model value for getting value and update parent on change
  const isPaymentCheque:any = computed({
    get: () => {
      return isPaymentMethodCheque.value
    },
    set: (modalValue: any) => {
      setIsPaymentMethodCheque(modalValue)
      // reset the isAmountPaidInUsd flag as we use same state for both payment methods
      setIsAmountPaidInUsd(false)
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
