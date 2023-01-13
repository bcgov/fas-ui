import { computed, ref, toRefs } from '@vue/composition-api'

import { FilingType } from '@/models/Payment'
import debounce from '@/util/debounce'
import { getAutoCompleteFilingTypes } from '../state'

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

  const isLoading = ref<boolean>(false)
  const hideNoData = ref<boolean>(true)
  const autoCompleteFilingTypes = ref<FilingType[]>([])

  const search = ref('')

  async function searchFilingTypes () {
    try {
      isLoading.value = true
      // start searching after typing 3 char
      if (search.value.length > 2) {
        autoCompleteFilingTypes.value = await getAutoCompleteFilingTypes(search.value)
      }
    } catch (error: any) {
      autoCompleteFilingTypes.value = []
      // TODO : Business errors (400s) need to be handled
      // eslint-disable-next-line no-console
      console.error('error ', error?.response?.data)
    } finally {
      isLoading.value = false
    }
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
    hideNoData,
    isLoading,
    search,
    autoCompleteFilingTypes,
    delayedSearch,
    itemText
  }
}
