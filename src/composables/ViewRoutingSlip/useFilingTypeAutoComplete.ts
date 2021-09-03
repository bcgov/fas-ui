import { computed, ref, toRefs } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { FilingType } from '@/models/Payment'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import debounce from '@/util/debounce'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useActions } = routingSlipModule

// Composable function to inject Props, options and values to useFIlingTypeAutoComplete component
export default function useFilingTypeAutoComplete (props, context) {
  const { value } = toRefs(props)

  // using same v-model value for getting value and update parent on change
  const filingType = computed({
    get: () => {
      return value?.value
    },
    set: (modalValue: FilingType) => {
      context.emit('input', modalValue)
    }
  })

  // store
  const { autoCompleteFilingTypes } = useState(['autoCompleteFilingTypes'])
  const { getAutoCompleteFilingTypes } = useActions([
    'getAutoCompleteFilingTypes'
  ])

  const isLoading = ref<boolean>(false)
  const hideNoData = ref<boolean>(true)

  const search = ref('')

  async function searchFilingTypes () {
    isLoading.value = true
    // start searching after typing 3 char
    if (search.value.length > 2) {
      await getAutoCompleteFilingTypes(search.value)
    }
    isLoading.value = false
  }

  function itemText (item) {
    // used for value and showing text
    // since value return as object just use same as value also
    return `${item?.filingTypeCode?.description} - ${item?.corpTypeCode?.description}`
  }

  const delayedSearch = debounce(() => {
    searchFilingTypes()
  })

  return {
    filingType,
    autoCompleteFilingTypes,
    hideNoData,
    isLoading,
    search,
    delayedSearch,
    itemText
  }
}
