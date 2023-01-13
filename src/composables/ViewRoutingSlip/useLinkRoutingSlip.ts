import { computed, ref } from '@vue/composition-api'
import { invoiceCount, isRoutingSlipAChild, isRoutingSlipLinked, isRoutingSlipVoid, linkedRoutingSlips, routingSlip } from '../state'

// Composable function to inject Props, options and values to useRoutingSlipInfo component
export default function useLinkRoutingSlip () {
  // store
  const showSearch = ref<boolean>(false)

  const isLoading = ref<boolean>(false)

  const childRoutingSlipDetails: any = computed(() => {
    // child array of routing slips if exist
    return linkedRoutingSlips.value?.children || []
  })
  const parentRoutingSlipDetails: any = computed(() => {
    // parent one Routing slip details
    return linkedRoutingSlips.value?.parent || {}
  })

  function toggleSearch () {
    showSearch.value = !showSearch.value
  }

  return {
    showSearch,
    toggleSearch,
    isRoutingSlipLinked,
    isRoutingSlipAChild,
    isRoutingSlipVoid,
    invoiceCount,
    routingSlip,
    isLoading,
    childRoutingSlipDetails,
    parentRoutingSlipDetails
  }
}
