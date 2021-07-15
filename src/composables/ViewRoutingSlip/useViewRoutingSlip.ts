import { toRefs, watch } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions, useState } = routingSlipModule

// Composable function to inject Props, options and values to useViewRoutingSlip component
export default function useViewRoutingSlip (props) {
  // using `toRefs` to create a Reactive Reference to the `slipId` property of props
  const { slipId } = toRefs(props)

  // vuex action and state
  const { getRoutingSlip } = useActions(['getRoutingSlip'])
  const { routingSlip } = useState(['routingSlip'])

  // watch any changes in slipId to get new values
  watch(slipId, (newSlipId:string, OldSlipId:string) => {
    if (newSlipId && (+newSlipId !== +OldSlipId)) {
      getRoutingSlipById()
    }
  }, { immediate: true })

  function getRoutingSlipById () {
    getRoutingSlip(slipId.value)
  }

  return {
    routingSlip,
    slipId,
    getRoutingSlipById
  }
}
