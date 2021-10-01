import CommonUtils from '@/util/common-util'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions } = routingSlipModule

export function useDashboard (_, context) {
  // vuex action and state
  const { resetRoutingSlipDetails } = useActions(['resetRoutingSlipDetails'])

  const appendQueryParamsIfNeeded = CommonUtils.appendQueryParamsIfNeeded

  function addRoutingSlip (): void {
    // we need to clear out the routing slip store before rendering the create slip component
    resetRoutingSlipDetails()
    // navigate now
    // Check if we had come from Staff dashboard
    context.root.$router.push(appendQueryParamsIfNeeded('/create-routing-slip', context.root.$route))
  }

  return {
    addRoutingSlip
  }
}
