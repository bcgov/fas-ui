import { toRefs, watch } from '@vue/composition-api'

import { GetRoutingSlipRequestPayload } from '@/models/RoutingSlip'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions, useState } = routingSlipModule

// Composable function to inject Props, options and values to useViewRoutingSlip component
export default function useViewRoutingSlip (props) {
  // using `toRefs` to create a Reactive Reference to the `slipId` property of props
  const { slipId } = toRefs(props)

  // vuex action and state
  const { getRoutingSlip, getLinkedRoutingSlips } = useActions(['getRoutingSlip', 'getLinkedRoutingSlips'])
  const { routingSlip } = useState(['routingSlip'])

  // watch any changes in slipId to get new values
  watch(
    slipId,
    async (newSlipId: string, OldSlipId: string) => {
      if (newSlipId && +newSlipId !== +OldSlipId) {
        await getRoutingSlipAndLinkedRoutingSlips()
      }
    },
    { immediate: true }
  )

  async function getRoutingSlipAndLinkedRoutingSlips () {
    const getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload = { routingSlipNumber: slipId.value, showGlobalLoader: true }
    await getRoutingSlip(getRoutingSlipRequestPayload)
    // get the linked routingslip children/parent for the current routingslip
    await getLinkedRoutingSlips(routingSlip.value.number)
  }

  return {
    routingSlip,
    slipId,
    getRoutingSlipAndLinkedRoutingSlips
  }
}
