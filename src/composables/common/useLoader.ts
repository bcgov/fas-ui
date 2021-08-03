/*
Composable function for loader component that is displayed whenever axios async process takes place
Global loader is used in App.vue where show a full route loader - <loader-component v-show="globalLoader"></loader-component>
While, isLoading can be used inside an individual component - <loader-component v-if="isLoading"></loader-component>
<load>
*/

import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { ref } from '@vue/composition-api'

const loadingStatusModule = createNamespacedHelpers('indicator') // specific module name
const { useGetters } = loadingStatusModule

export function useLoader () {
  const isLoading = ref<boolean>(false)
  // vuex getters
  const { isThereActiveCalls } = useGetters(['isThereActiveCalls'])

  function changeLoadingStatus (isLoadingStatus: boolean): void {
    isLoading.value = isLoadingStatus
  }

  function toggleLoading (): void {
    changeLoadingStatus(!isLoading.value)
  }

  return {
    isLoading,
    isThereActiveCalls,
    toggleLoading
  }
}
