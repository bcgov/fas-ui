import { computed, ref } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useActions } = routingSlipModule

// Composable function to inject Props, options and values to useRoutingSlipInfo component
export default function useLinkRoutingSlip (props) {
  // store
  const { routingSlip } = useState([
    'routingSlip'

  ])
  const showSearch = ref<boolean>(false)

  const alreadyLinked = ref<boolean>(false)
  const isLoading = ref<boolean>(false)

  const isChildRS: any = computed(() => {
    return !!routingSlip.value.parentNumber
  })

  function toggleSearch () {
    showSearch.value = !showSearch.value
  }

  return {
    showSearch,
    toggleSearch,
    alreadyLinked,
    isChildRS,
    routingSlip,
    isLoading
  }
}
