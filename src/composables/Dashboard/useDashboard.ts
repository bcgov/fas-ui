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
    // Check if we had come from Staff dashboard
    const route = context.root.$route
    if (route.query?.redirectFromAuth) {
      context.root.$router.push('/create-routing-slip?redirectFromAuth=true')
    } else {
      context.root.$router.push('create-routing-slip')
    }
  }

  return {
    addRoutingSlip
  }
}
