/*
Composable function for loader component that is displayed whenever axios async process takes place
*/

import { createNamespacedHelpers } from 'vuex-composition-helpers'

const loadingStatusModule = createNamespacedHelpers('loadingStatus') // specific module name
const { useState } = loadingStatusModule

export function useLoader () {
  // vuex state and mutations
  const { isLoading } = useState(['isLoading'])

  return {
    isLoading
  }
}
