import { Code } from '@/models/Code'
import { SlipStatus } from '@/util/constants'
import { ref, computed, toRefs, onMounted } from '@vue/composition-api'
import { useCodes } from '../useCodes'

export function useStatusList (props, context) {
  const { getRoutingSlipStatusList, routingSlipStatusList } = useCodes()
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
    return routingSlipStatusList.value?.filter(
      statusList => statusList.code === code
    )
  }

  return {
    routingSlipStatusList,
    currentStatus,
    statusLabel,
    selectedStatusObject
  }
}
