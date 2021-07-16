/*
Composable function for loader component that is displayed whenever axios async process takes place
*/

import { computed } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const loadingStatusModule = createNamespacedHelpers('loadingStatus') // specific module name
const { useState } = loadingStatusModule

export function useLoader () {
  // vuex state and mutations
  const { isLoading } = useState(['isLoading'])
  // get value from state; we dont need a setter.
  const visible:any = computed({
    get: () => {
      return isLoading.value || false
    },
    set: () => {
    }
  })

  return {
    visible
  }
}
