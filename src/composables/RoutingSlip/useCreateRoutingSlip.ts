import { createNamespacedHelpers } from 'vuex-composition-helpers'

import { ref } from '@vue/composition-api'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlip component
export function useCreateRoutingSlip () {
  const createRoutingSlipForm = ref<HTMLFormElement>()
  const createRoutingSlipDetailsRef = ref<HTMLFormElement>()
  const createRoutingSlipPaymentRef = ref<HTMLFormElement>()

  const { createRoutingSlip } = useActions(['createRoutingSlip'])

  function isValid (): boolean {
    // We would want to trigger validate() of all the children
    let isValidForm = createRoutingSlipDetailsRef.value?.isValid()
    isValidForm = createRoutingSlipPaymentRef.value?.isValid() && isValidForm
    return isValidForm
  }

  // Create Routing slip
  function createRoutingSlipNow () {
    if (isValid()) {
      createRoutingSlip()
    }
  }

  // Cancel Routing slip flow
  function cancel () {}

  return {
    createRoutingSlipForm,
    createRoutingSlipDetailsRef,
    createRoutingSlipPaymentRef,
    createRoutingSlipNow,
    cancel,
    isValid
  }
}
