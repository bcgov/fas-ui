import { computed, reactive, ref, watch } from '@vue/composition-api'

import { RefundRequestDetails } from '@/models/RoutingSlip'
import { SlipStatus } from '@/util/constants'
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
  const isAddressEditable = ref<boolean>(false)
  const currentStatus = ref<Code>(null)
  const errorMessage = ref<string>('')

  const refundRequestForm = ref<HTMLFormElement>()
  const refundRequestDetails = ref<RefundRequestDetails>(null)
  const isApproverRole = CommonUtils.isApproverRole()

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

  const isApprovalFlow = computed(() => {
    // if refund process saved show status as disable
    return (isApproverRole && CommonUtils.isRefundProcessStatus(routingSlipDetails.value?.status)) || false
  })

  const showAddress = computed(() => {
    if (editMode.value) {
      return (isRefundProcess(currentStatus?.value) && canRequestRefund.value) || false
    }

    return isRefundProcess(currentStatus?.value) || false
  })

  const showAddressEditMode = computed(() => {
    // need show address as editable also as view
    if (isAddressEditable.value) {
      return true
    }
    return (isApproverRole && CommonUtils.isRefundRequestStatus(routingSlipDetails.value.status)) || false
  })

  const isEditable = computed(() => {
    // if user can edit by status
    return CommonUtils.isEditEnableBystatus(routingSlipDetails.value?.status) || false
  })

  // since we have to return different value
  watch(
    [routingSlipDetails, routingSlipStatusList],
    ([newRoutingSlipDetails], [oldRoutinSlip]) => {
      // routingSlipStatusList need to avoid async data issues
      if (
        routingSlipStatusList.value.length > 0 &&
        (!currentStatus.value ||
          currentStatus.value?.code !== newRoutingSlipDetails.status)
      ) {
        currentStatus.value = getStatusObject(newRoutingSlipDetails.status)
      }
      // to update address
      if (oldRoutinSlip?.number !== newRoutingSlipDetails.number || oldRoutinSlip?.status !== newRoutingSlipDetails.status) {
        if (newRoutingSlipDetails?.refunds && newRoutingSlipDetails?.refunds[0]) {
          const details = newRoutingSlipDetails?.refunds[0].details
          refundRequestDetails.value = JSON.parse(JSON.stringify(details))
        } else {
          refundRequestDetails.value = null
        }
      }
      //  if approver and status requested, show as edit mode
      editMode.value = isApproverRole && CommonUtils.isRefundRequestStatus(routingSlipDetails.value.status)
    },
    { immediate: true, deep: true }
  )
  function getStatusObject (status) {
    const statusObject = selectedStatusObject(
      status
    )
    return statusObject[0] ? statusObject[0] : ''
  }

  function toggleEdit (edit: boolean) {
    editMode.value = edit
    // reset to orginal status on toggle
    currentStatus.value = getStatusObject(routingSlipDetails.value.status)
    isAddressEditable.value = edit
  }
  function cancelOrReject (isApprovalFlowEnabled) {
    if (isApprovalFlowEnabled) {
      updateRefund(SlipStatus.REFUNDREJECTED)
    } else {
      toggleEdit(false)
    }
  }

  // update routign slip status on click of done
  async function updateStatus (isApprovalFlowEnabled:boolean = false) {
    // need to call validate only of its refund
    const statusDetails = {
      status: currentStatus.value.code,
      details: refundRequestDetails.value
    }
    if (isRefundProcess(currentStatus.value)) {
      const status = isApprovalFlowEnabled ? SlipStatus.REFUNDAUTHORIZED : currentStatus.value.code
      updateRefund(status)
      // TODO : mat be need to do this only on approval flow not on reject
      toggleEdit(false)
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
      isAddressEditable.value = true
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
    isApprovalFlow,
    cancelOrReject,
    isEditable
  }
}
