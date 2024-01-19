/*
Composable function for SearchColumn Filter component. It tracks the columns
that are present in a parent data-table and tracks display property to true/false
*/

import { computed, toRefs } from 'vue'

export function useSearchColumnFilterComponent (props, emits) {
  const { modelValue } = toRefs(props)

  // using same v-model value for getting value and update parent on change
  const selectedHeaderSearchList = computed({
    get: () => {
      return modelValue.value
    },
    set: (modalValue: any[]) => {
      emits('input', modalValue)
    }
  })

  return {
    selectedHeaderSearchList
  }
}
