import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to CreateRoutingSlip component
export function useCreateRoutingSlip () {
  const createRoutingSlipForm = ref<HTMLFormElement>()
  const createRoutingSlipDetailsRef = ref<HTMLFormElement>()
  const createRoutingSlipPaymentRef = ref<HTMLFormElement>()

  // Create Routing slip
  function createRoutingSlip () {
  }

  // Cancel Routing slip flow
  function cancel () {
  }

  return {
    createRoutingSlipForm,
    createRoutingSlipDetailsRef,
    createRoutingSlipPaymentRef,
    createRoutingSlip,
    cancel
  }
}
