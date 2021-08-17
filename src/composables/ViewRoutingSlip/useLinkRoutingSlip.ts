import { ref } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'
import CommonUtils from '@/util/common-util'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState } = routingSlipModule

// Composable function to inject Props, options and values to useRoutingSlipInfo component
export default function useLinkRoutingSlip (props) {
  // store
  const { routingSlip } = useState(['routingSlip'])

  const showSearch = ref<boolean>(false)
  const errorMessage = ref('')
  const alreadyLinked = ref<boolean>(false)
  const isChildRS = ref<boolean>(false)

  function toggleSearch () {
    showSearch.value = !showSearch.value
  }
  function searchRS () {
    if (number.value === '') {
      errorMessage.value = 'Please enter a routing slip - unique ID'
    } else {
      errorMessage.value = ''
    }
  }

  const number = ref('')
  // Input field rules
  const numberRules = CommonUtils.requiredFieldRule(
    'Please enter a routing slip - unique ID'
  )
  return {
    showSearch,
    toggleSearch,
    number,
    numberRules,
    searchRS,
    errorMessage,
    alreadyLinked,
    isChildRS,
    routingSlip
  }
}
