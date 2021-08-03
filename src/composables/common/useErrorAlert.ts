/*
Composable function for Error Handler component that is displayed whenever axios async process failes
Global Error Handler is used in App.vue
*/

import { AXIOS_ERROR_ALERT_TIME_OUT } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { watch } from '@vue/composition-api'

const loadingStatusModule = createNamespacedHelpers('indicator') // specific module name
const { useState, useMutations } = loadingStatusModule

export function useErrorAlert () {
  // vuex state and getters
  const { hasCallFailed } = useState(['hasCallFailed'])
  const { setHasCallFailed } = useMutations(['setHasCallFailed'])

  // We are watching hasCallFailed and if it is true, we set it back to false after an interval.
  // While the value was true, errorhandler component alert would be displayed
  watch(hasCallFailed, (newValue: boolean) => {
    if (newValue) {
      setTimeout(() => setHasCallFailed(false), AXIOS_ERROR_ALERT_TIME_OUT)
    }
  })

  return {
    hasCallFailed
  }
}
