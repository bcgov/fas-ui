import { Code } from '@/models/Code'
import { ref, computed, toRefs, onMounted, watch } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const codeModule = createNamespacedHelpers('fasCodes') // specific module name
const { useState, useMutations, useActions } = codeModule

export function useStatusList (props, context) {
  // default value set blank incase if we didnt pass props
  const { value = ref('') } = toRefs(props)

  // using same v-model value for getting value and update parent on change
  const currentStatus = computed({
    get: () => {
      return value.value || ''
    },
    set: (modalValue: Code) => {
      context.emit('input', modalValue.code)
    }
  })

  // state , action , mutation from vuex store
  const { routingSlipStatusList } = useState(['routingSlipStatusList'])

  const { getRoutingSlipStatusList } = useActions(['getRoutingSlipStatusList'])

  const routingSlipStatus = computed(() => {
    return routingSlipStatusList?.value
  })

  onMounted(() => {
    // getting status list mouint and setting inside store
    // will make call once till page refresh
    getRoutingSlipStatusList()
  })

  /**
   * return status label on code
   *
   * @param {string} code
   * @returns {string} description - label
   */
  function statusLabel (code: string) {
    const codeArray = selectedStatusObject(code)
    return codeArray[0]?.description || ''
  }

  /**
   * filtering array and find given value of object
   * use full when needed to set object of status
   * @param {string} code
   * @returns [{code, description}]
   */

  function selectedStatusObject (code: string) {
    return routingSlipStatus.value?.filter(
      statusList => statusList.code === code
    )
  }

  return {
    routingSlipStatus,
    currentStatus,
    statusLabel,
    selectedStatusObject
  }
}
