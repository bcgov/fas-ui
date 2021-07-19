import { computed, reactive, ref, toRefs, watch } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { useStatusList } from '@/composables/common/useStatusList'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions, useState } = routingSlipModule

// Composable function to inject Props, options and values to useRoutingSlipInfo component
export default function useRoutingSlipInfo (props) {
  // store
  const { routingSlip } = useState(['routingSlip'])
  const { updateRoutingSlipStatus } = useActions(['updateRoutingSlipStatus'])

  const editMode = ref<boolean>(false)
  const currentStatus = ref('')
  // passign value as blank to avoid warning
  const { statusLabel } = useStatusList(reactive({ value: '' }), {})

  const routinSlipDetails = computed(() => {
    return routingSlip.value || {}
  })

  // since we have to return different value
  watch(
    routinSlipDetails,
    () => {
      if (currentStatus.value !== routinSlipDetails.value.status) {
        currentStatus.value = routinSlipDetails.value.status
      }
    },
    { immediate: true, deep: true }
  )

  function toggleEdit (edit: boolean) {
    editMode.value = edit
  }

  // update routign slip status on click of done
  async function updateStatus () {
    await updateRoutingSlipStatus(currentStatus.value)
    toggleEdit(false)
  }
  // get label of statu
  function getStatusLabel (code: string) {
    return statusLabel(code)
  }

  return {
    routingSlip,
    editMode,
    routinSlipDetails,
    toggleEdit,
    currentStatus,
    updateStatus,
    getStatusLabel
  }
}
