import CommonUtils from '@/util/common-util'
import { resetRoutingSlipDetails } from '../state'

export function useDashboard (_, context) {
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
