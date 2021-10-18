import { computed, reactive, ref, toRefs, watch } from '@vue/composition-api'

import { RefundRequestDetails } from '@/models/RoutingSlip'
import { SlipStatus, Role } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { useStatusList } from '@/composables/common/useStatusList'
import { Code } from '@/models/Code'
import CommonUtils from '@/util/common-util'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions, useState, useGetters } = routingSlipModule

const codeModule = createNamespacedHelpers('fasCodes') // specific module name
const { useState: useCodeState } = codeModule

// Composable function to inject Props, options and values to useRoutingSlipInfo component
export default function useRoutingSlipInfo (props) {
  // store
  const { routingSlip } = useState(['routingSlip'])
  const { routingSlipStatusList } = useCodeState(['routingSlipStatusList'])
  const { updateRoutingSlipStatus } = useActions(['updateRoutingSlipStatus'])
  const { isRoutingSlipAChild } = useGetters(['isRoutingSlipAChild'])

  const editMode = ref<boolean>(false)
  const showAddressEditMode = ref<boolean>(CommonUtils.isApproverRole())
  const currentStatus = ref<Code>(null)
  const errorMessage = ref<string>('')

  const refundRequestForm = ref<HTMLFormElement>()
  const refundRequestDetails = ref<RefundRequestDetails>(null)

  // passign value as blank to avoid warning
  const { statusLabel, selectedStatusObject } = useStatusList(
    reactive({ value: '' }),
    {}
  )

  const routingSlipDetails = computed(() => {
    return routingSlip.value || {}
  })

  const canRequestRefund = computed(() => {
    return routingSlipDetails.value.remainingAmount > 0 || false
  })

  const isStatusDisabled = computed(() => {
    // if refund process saved show status as disable
    return CommonUtils.isRefundProcessStatus(routingSlipDetails.value?.status) || false
  })

  const showAddress = computed(() => {
    if (editMode.value) {
      return (isRefundProcess(currentStatus?.value) && canRequestRefund.value) || false
    }

    return isRefundProcess(currentStatus?.value) || false
  })

  // since we have to return different value
  watch(
    [routingSlipDetails, routingSlipStatusList],
    () => {
      // routingSlipStatusList need to avoid async data issues
      if (
        routingSlipStatusList.value.length > 0 &&
        (!currentStatus.value ||
          currentStatus.value?.code !== routingSlipDetails.value.status)
      ) {
        const statusObject = selectedStatusObject(
          routingSlipDetails.value.status
        )
        currentStatus.value = statusObject[0] ? statusObject[0] : ''
        if (routingSlipDetails.value?.refunds && routingSlipDetails.value?.refunds[0]) {
          const details = routingSlipDetails.value?.refunds[0].details
          refundRequestDetails.value = JSON.parse(JSON.stringify(details))
          //  if approver, show as edit mode
          if (CommonUtils.isApproverRole() && CommonUtils.isRefundProcessStatus(routingSlipDetails.value.status)) {
            editMode.value = true
          }
        } else {
          editMode.value = false
          refundRequestDetails.value = null
        }
      }
    },
    { immediate: true, deep: true }
  )

  function toggleEdit (edit: boolean) {
    editMode.value = edit
  }

  // update routign slip status on click of done
  async function updateStatus () {
    // need to call validate only of its refund
    const statusDetails = {
      status: currentStatus.value.code,
      details: refundRequestDetails.value
    }
    if (isRefundProcess(currentStatus.value)) {
      updateRefund(currentStatus.value.code)
    } else {
      await updateRoutingSlipStatus(statusDetails)
      toggleEdit(false)
    }
  }

  async function updateRefund (status:any = SlipStatus.REFUNDREQUEST) {
    if (refundRequestForm.value.isValid()) {
      const statusDetails = {
        status: status,
        details: refundRequestDetails.value
      }
      await updateRoutingSlipStatus(statusDetails)
    }
  }

  // get label of status
  function getStatusLabel (code: string) {
    return statusLabel(code)
  }
  function isRefundProcess (status) {
    return CommonUtils.isRefundProcessStatus(status?.code)
  }

  function statusChange (status) {
    // TODO change to computed for supervisor role
    // showAddress.value = false
    errorMessage.value = ''

    const showAddressStatus = isRefundProcess(status)

    //  change to refund status once status available
    if (showAddressStatus && canRequestRefund.value) {
      showAddressEditMode.value = true
    } else if (!canRequestRefund.value) {
      // showAddressEditMode.value = false
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
    errorMessage,
    showAddressEditMode,
    isStatusDisabled

  }
}
