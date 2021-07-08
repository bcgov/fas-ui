import { AccountInfo, RoutingSlip, RoutingSlipDetails } from '@/models/routingSlip'
import { CreateRoutingSlipDetails, CreateRoutingSlipPayment } from '@/components/RoutingSlip'

import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to CreateRoutingSlip component
export function useCreateRoutingSlip () {
  const createRoutingSlipForm = ref<HTMLFormElement>()
  const createRoutingSlipDetailsRef = ref<HTMLFormElement>()
  const createRoutingSlipPaymentRef = ref<HTMLFormElement>()

  function isValid (): boolean {
    // We would want to trigger validate() of all the children
    let isValid = createRoutingSlipDetailsRef.value?.isValid()
    isValid = createRoutingSlipPaymentRef.value?.isValid() && isValid
    return isValid
  }

  function getRoutingSlipInput (): RoutingSlip {
    const routingSlip: RoutingSlip = {}
    // construct object from children
    routingSlip.payments = createRoutingSlipPaymentRef.value?.getRoutingSlipPaymentInput()
    const routingSlipDetails: RoutingSlipDetails = createRoutingSlipDetailsRef.value?.getRoutingSlipDetailsInput()
    if (routingSlipDetails) {
      routingSlip.routingSlipDate = routingSlipDetails.routingSlipDate
      routingSlip.number = routingSlipDetails.number
      const accountInfo: AccountInfo = {
        accountName: routingSlipDetails.accountName
      }
      routingSlip.paymentAccount = accountInfo
    }
    return routingSlip
  }

  // Create Routing slip
  function createRoutingSlip () {
    if (isValid()) {
      getRoutingSlipInput()
    }
  }

  // Cancel Routing slip flow
  function cancel () {
  }

  return {
    createRoutingSlipForm,
    createRoutingSlipDetailsRef,
    createRoutingSlipPaymentRef,
    createRoutingSlip,
    cancel,
    isValid,
    getRoutingSlipInput
  }
}
