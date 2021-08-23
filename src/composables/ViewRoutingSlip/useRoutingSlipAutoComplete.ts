import { reactive, ref } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'
import CommonUtils from '@/util/common-util'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useActions } = routingSlipModule

// Composable function to inject Props, options and values to useRoutingSlipInfo component
export default function useLinkRoutingSlip (_, context) {
  // store
  const { autoCompleteRoutingSlips, routingSlip } = useState([
    'autoCompleteRoutingSlips',
    'routingSlip'
  ])
  const {
    getAutoCompleteRoutingSlips,
    saveLinkRoutingSlip,
    getRoutingSlip,
    getLinkedRoutingSlips
  } = useActions([
    'getAutoCompleteRoutingSlips',
    'saveLinkRoutingSlip',
    'getRoutingSlip',
    'getLinkedRoutingSlips'
  ])

  const errorMessage = ref('')
  const isLoading = ref<boolean>(false)
  const hideNoData = ref<boolean>(false)

  const number = ref('')
  const search = ref('')

  function toggleSearch () {
    context.emit('toggleSearch')
  }

  function searchRS () {
    if (number.value === '') {
      errorMessage.value = 'Please enter a routing slip - unique ID'
    } else {
      errorMessage.value = ''
      saveLinkedRoutingSlip()
    }
  }

  async function searchRoutingSlip () {
    isLoading.value = true

    // Add debouncing here
    // start searching after typing 3 char
    if (search.value.length > 2) {
      await getAutoCompleteRoutingSlips(search.value)

      hideNoData.value = false
    } else {
      hideNoData.value = true
    }
    // hide no data message on loading
    hideNoData.value = isLoading.value ? true : hideNoData.value
    isLoading.value = false
  }

  async function saveLinkedRoutingSlip () {
    let linkingErrors = ''

    const response = await saveLinkRoutingSlip(search.value)
    if (response?.error) {
      // setting error message
      linkingErrors = response?.details?.detail ? response.details.detail : ''
    } else {
      //  TODO: check for global loading
      const currentRoutingSlipId = routingSlip.value?.number || ''
      await getRoutingSlip(currentRoutingSlipId)
      // get the linked routingslip children/parent for the current routingslip
      await getLinkedRoutingSlips(currentRoutingSlipId)
    }

    errorMessage.value = linkingErrors
  }

  // Input field rules
  const numberRules = CommonUtils.requiredFieldRule(
    'Please enter a routing slip - unique ID'
  )
  return {
    toggleSearch,
    number,
    numberRules,
    searchRS,
    errorMessage,
    searchRoutingSlip,
    autoCompleteRoutingSlips,
    isLoading,
    search,
    hideNoData,
    saveLinkRoutingSlip
  }
}
