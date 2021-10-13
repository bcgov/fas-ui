import { computed, reactive, ref, toRefs, watch } from '@vue/composition-api'

import { RefundRequestDetails } from '@/models/RoutingSlip'
import { SlipStatus } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { useStatusList } from '@/composables/common/useStatusList'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions, useState, useGetters } = routingSlipModule

// Composable function to inject Props, options and values to useRoutingSlipInfo component
export default function useRoutingSlipInfo (props) {
  // store
  const { routingSlip } = useState(['routingSlip'])
  const { updateRoutingSlipStatus } = useActions(['updateRoutingSlipStatus'])
  const { isRoutingSlipAChild } = useGetters(['isRoutingSlipAChild'])

  const editMode = ref<boolean>(false)
  const showAddress = ref<boolean>(false)
  const currentStatus = ref('')
  const errorMessage = ref<string>('')

  const refundRequestForm = ref<HTMLFormElement>()
  const refundRequestDetails = ref<RefundRequestDetails>(null)

  // passign value as blank to avoid warning
  const { statusLabel } = useStatusList(reactive({ value: '' }), {})

  const routingSlipDetails = computed(() => {
    return routingSlip.value || {}
  })

  // since we have to return different value
  watch(
    routingSlipDetails,
    () => {
      if (currentStatus.value !== routingSlipDetails.value.status) {
        currentStatus.value = routingSlipDetails.value.status
      }
    },
    { immediate: true, deep: true }
  )

  function toggleEdit (edit: boolean) {
    editMode.value = edit
  }

  // update routign slip status on click of done
  async function updateStatus () {
    if (refundRequestForm.value.isValid()) {
      await updateRoutingSlipStatus(currentStatus.value)
      toggleEdit(false)
    }
  }
  // get label of status
  function getStatusLabel (code: string) {
    return statusLabel(code)
  }

  function statusChange (status) {
    // TODO change to computed for supervisor role
    showAddress.value = false
    errorMessage.value = ''
    // TODO remove BOUNCED status
    const showAddressStatus = [SlipStatus.BOUNCED,
      SlipStatus.REFUNDREQUEST,
      SlipStatus.REFUNDAUTHORIZED,
      SlipStatus.REFUNDCOMPLETED].includes(status.code)

    // TODO confirm show error on 0
    const showValidationError = routingSlipDetails.value.remainingAmount === 0
    //  change to refund status once status available
    if (showAddressStatus && !showValidationError) {
      showAddress.value = true
    } else if (showValidationError) {
      showAddress.value = false
      errorMessage.value = 'There is not enough funds for refund'
    }
  }

  return {
    routingSlip,
    editMode,
    routingSlipDetails,
    toggleEdit,
    currentStatus,
    updateStatus,
    getStatusLabel,
    isRoutingSlipAChild,
    statusChange,
    showAddress,
    refundRequestForm,
    refundRequestDetails,
    errorMessage
  }
}
