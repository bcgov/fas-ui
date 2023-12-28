import { ref } from 'vue'

import CommonUtils from '@/util/common-util'
import { GetRoutingSlipRequestPayload } from '@/models/RoutingSlip'
import debounce from '@/util/debounce'
import { useRoutingSlip } from '../useRoutingSlip'

// Composable function to inject Props, options and values to useRoutingSlipInfo component
export default function useLinkRoutingSlip (_, context) {
  const {
    autoCompleteRoutingSlips,
    getAutoCompleteRoutingSlips,
    getLinkedRoutingSlips,
    getRoutingSlip,
    routingSlip,
    saveLinkRoutingSlip
  } = useRoutingSlip()
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
    // start searching after typing 3 char
    if (search.value.length > 2) {
      autoCompleteRoutingSlips.value = await getAutoCompleteRoutingSlips(search.value)
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
      const getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload = { routingSlipNumber: currentRoutingSlipId }
      await getRoutingSlip(getRoutingSlipRequestPayload)
      // get the linked routingslip children/parent for the current routingslip
      await getLinkedRoutingSlips(currentRoutingSlipId)
    }

    errorMessage.value = linkingErrors
  }

  const delayedSearch = debounce(() => {
    searchRoutingSlip()
  })

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
    saveLinkRoutingSlip,
    delayedSearch
  }
}
