import CommonUtils from '@/util/common-util'
import { useRoutingSlip } from '../useRoutingSlip'
import { useRoute, useRouter } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'

export function useDashboard () {
  const router = useRouter()
  const route = useRoute()
  const { resetRoutingSlipDetails } = useRoutingSlip()
  const appendQueryParamsIfNeeded = CommonUtils.appendQueryParamsIfNeeded

  function addRoutingSlip (): void {
    // we need to clear out the routing slip store before rendering the create slip component
    resetRoutingSlipDetails()
    // navigate now
    // Check if we had come from Staff dashboard
    router.push(appendQueryParamsIfNeeded('/create-routing-slip', route))
  }

  return {
    addRoutingSlip
  }
}
