/*
Composable function for SearchColumn Filter component. It tracks the columns
that are present in a parent data-table and tracks display property to true/false
*/

import { computed, toRefs } from '@vue/composition-api'

export function useSearchColumnFilterComponent (props, context) {
  const { value } = toRefs(props)

  // using same v-model value for getting value and update parent on change
  const selectedHeaderSearchList = computed({
    get: () => {
      return value.value
    },
    set: (modalValue: any[]) => {
      context.emit('input', modalValue)
    }
  })

  return {
    selectedHeaderSearchList
  }
}
