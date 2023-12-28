/*
Composable function for Error Handler component that is displayed whenever axios async process failes
Global Error Handler is used in App.vue
*/

import { AXIOS_ERROR_ALERT_TIME_OUT } from '@/util/constants'
import { watch } from 'vue'
import { useIndicators } from '../useIndicators'

export function useErrorAlert () {
  const { hasCallFailed } = useIndicators()
  // We are watching hasCallFailed and if it is true, we set it back to false after an interval.
  // While the value was true, errorhandler component alert would be displayed
  watch(hasCallFailed, (newValue: boolean) => {
    if (newValue) {
      setTimeout(() => { hasCallFailed.value = false }, AXIOS_ERROR_ALERT_TIME_OUT)
    }
  })

  return {
    hasCallFailed
  }
}
