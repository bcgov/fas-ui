/*
Composable function for loader component that is displayed whenever axios async process takes place
Global loader is used in App.vue where show a full route loader - <loader-component v-show="globalLoader"></loader-component>
While, isLoading can be used inside an individual component - <loader-component v-if="isLoading"></loader-component>
<load>
*/

import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { ref } from '@vue/composition-api'

const loadingStatusModule = createNamespacedHelpers('loader') // specific module name
const { useState } = loadingStatusModule

export function useLoader () {
  const isLoading = ref<boolean>(false)
  // vuex state and mutations
  const { globalLoader } = useState(['globalLoader'])

  function toggleLoading (): void {
    isLoading.value = !isLoading.value
  }

  return {
    globalLoader,
    isLoading,
    toggleLoading
  }
}
