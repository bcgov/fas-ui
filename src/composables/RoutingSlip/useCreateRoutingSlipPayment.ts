import { computed, onMounted, ref, watch } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useMutations } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipPayment () {
  const isPaymentCheque = ref<boolean>(undefined)
  const createRoutingSlipChequePaymentRef = ref<HTMLFormElement>(null)
  const createRoutingSlipCashPaymentRef = ref<HTMLFormElement>(null)

  // vuex state and mutations
  const { isPaymentMethodCheque } = useState(['isPaymentMethodCheque'])
  const { setIsPaymentMethodCheque } = useMutations(['setIsPaymentMethodCheque'])

  // watch any changes and update to store
  watch(isPaymentCheque, () => {
    setIsPaymentMethodCheque(isPaymentCheque.value)
  }, { immediate: true })

  function isValid (): boolean {
    return isPaymentCheque.value === true ? createRoutingSlipChequePaymentRef.value?.isValid() : createRoutingSlipCashPaymentRef.value?.isValid()
  }

  onMounted(() => {
    // default the payment type of routing slip to cheque
    isPaymentCheque.value = true
  })

  return {
    isPaymentCheque,
    createRoutingSlipChequePaymentRef,
    createRoutingSlipCashPaymentRef,
    isValid,
    onMounted
  }
}
