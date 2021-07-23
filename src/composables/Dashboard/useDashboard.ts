import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions } = routingSlipModule

export function useDashboard (_, context) {
  // vuex action and state
  const { resetRoutingSlipDetails } = useActions(['resetRoutingSlipDetails'])

  function addRoutingSlip (): void {
    // we need to clear out the routing slip store before rendering the create slip component
    resetRoutingSlipDetails()
    // navigate now
    context.root.$router.push('create-routing-slip')
  }

  return {
    addRoutingSlip
  }
}
