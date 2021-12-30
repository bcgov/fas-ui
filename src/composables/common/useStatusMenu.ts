import { Code } from '@/models/Code'
import { SlipStatusLabel } from '@/util/constants'
import { ref, computed, toRefs, onMounted, watch } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const codeModule = createNamespacedHelpers('fasCodes') // specific module name
const { useState, useActions } = codeModule

export function useStatusMenu (props, context) {
  // default value set blank incase if we didnt pass props
  const { value = ref(''), allowedStatusList = ref([]) } = toRefs(props)

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
    return getFormattedStatusLsist()
  })

  onMounted(() => {
    // getting status list mouint and setting inside store
    // will make call once till page refresh
    getRoutingSlipStatusList()
  })

  function getFormattedStatusLsist () {
    let filterStatus = routingSlipStatusList.value
    if (allowedStatusList.value && allowedStatusList.value.length > 0) {
      filterStatus = routingSlipStatusList.value && routingSlipStatusList.value.filter(status => allowedStatusList.value.includes(status.code))
    }

    return filterStatus.map(statusList => {
      statusList.label = SlipStatusLabel[statusList.code] || statusList.description
      return statusList
    })
  }

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

  function setStatus (status) {
    context.emit('update:statusChange', status)
  }
  return {
    routingSlipStatus,
    currentStatus,
    statusLabel,
    selectedStatusObject,
    allowedStatusList,
    setStatus
  }
}
