import { computed, reactive, ref, watch } from '@vue/composition-api'

// import { createNamespacedHelpers } from 'vuex-composition-helpers'
// import { useStatusList } from '../common/useStatusList'
// import { useLoader } from '../common/useLoader'

export default function useClock () {
  const display:any = computed(() => {
    return Date.now()
  })

  return {
    display
  }
}
