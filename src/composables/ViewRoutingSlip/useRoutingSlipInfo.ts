import { computed, reactive, ref, watch } from '@vue/composition-api'

import { RefundRequestDetails } from '@/models/RoutingSlip'
import { SlipStatus } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { useStatusMenu } from '@/composables/common/useStatusMenu'
import { Code } from '@/models/Code'
import CommonUtils from '@/util/common-util'
import i18n from '@/plugins/i18n'

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

  const addMoreDetails = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
  const isAddressEditable = ref<boolean>(false)
  const currentStatus = ref<Code>(null)
  const errorMessage = ref<string>('')

  const modalDialogRef = ref<HTMLFormElement>()

  const refundRequestForm = ref<HTMLFormElement>()
  const refundRequestDetails = ref<RefundRequestDetails>(null)
  const isApproverRole = CommonUtils.isApproverRole()

  // passign value as blank to avoid warning
  const { statusLabel, getSelectedStatusObject } = useStatusMenu(
    reactive({ value: '' }),
    {}
  )

  const routingSlipDetails = computed(() => {
    return routingSlip.value || {}
  })

  const modalText = computed(() => {
    let title = i18n?.t('NSFWarningTitle')
    let subText = i18n?.t('NSFWarningText')
    const icon = 'mdi-help-circle-outline'
    let confirmBtnText = 'Place status to NSF'
    const cancelBtnText = 'Cancel'
    if (isWriteOfProcess(currentStatus.value)) {
      title = i18n?.t('WriteOffWarningTitle')
      subText = i18n?.t('WriteOffWarningText')
      confirmBtnText = 'Authorize Write off'
    }
    return { title, subText, icon, confirmBtnText, cancelBtnText }
  })

  const canRequestRefund = computed(() => {
    return routingSlipDetails.value.remainingAmount > 0 || false
  })

  const isApprovalFlow = computed(() => {
    // if refund process saved show status as disable
    return (
      (isApproverRole &&
        CommonUtils.isRefundProcessStatus(routingSlipDetails.value?.status)) ||
      false
    )
  })

  const showAddress = computed(() => {
    // if (addMoreDetails.value) {
    return (
      (isRefundProcess(currentStatus?.value) && canRequestRefund.value) ||
        false
    )
    // }

    // return false // isRefundProcess(currentStatus?.value) || false
  })

  const showAddressEditMode = computed(() => {
    // need show address as editable also as view
    return isAddressEditable.value
  })
  const allowedStatusList = computed(() => {
    // get allowd status from API and add here
    return routingSlipDetails.value?.allowedStatuses || [] // 'COMPLETE', 'ACTIVE', 'REFUND_REQUESTED', 'CANCEL_REFUND_REQUEST'
  })

  const isEditable = computed(() => {
    // if user can edit by status
    const isEditableStatus =
      CommonUtils.isEditEnabledBystatus(routingSlipDetails.value?.status) ||
      false
    return CommonUtils.isRefundRequestStatus(routingSlipDetails.value.status)
      ? isApproverRole
      : isEditableStatus
  })

  // since we have to return different value
  watch(
    [routingSlipDetails, routingSlipStatusList],
    ([newRoutingSlipDetails], [oldRoutingSlip]) => {
      // routingSlipStatusList need to avoid async data issues
      if (
        routingSlipStatusList.value.length > 0 &&
        (!currentStatus.value ||
          currentStatus.value?.code !== newRoutingSlipDetails.status)
      ) {
        currentStatus.value = getStatusObject(newRoutingSlipDetails.status)
      }
      // to update address
      if (
        oldRoutingSlip?.number !== newRoutingSlipDetails.number ||
        oldRoutingSlip?.status !== newRoutingSlipDetails.status
      ) {
        if (
          newRoutingSlipDetails?.refunds &&
          newRoutingSlipDetails?.refunds[0]
        ) {
          const details = newRoutingSlipDetails?.refunds[0].details
          refundRequestDetails.value = JSON.parse(JSON.stringify(details))
        } else {
          refundRequestDetails.value = null
        }
        // addMoreDetails.value = true
      }
    },
    { immediate: true, deep: true }
  )
  function getStatusObject (status) {
    const statusObject = getSelectedStatusObject(status)
    return statusObject[0] ? statusObject[0] : ''
  }

  function cancelOrReject () {
    if (isApprovalFlow.value) {
      updateRefund(SlipStatus.REFUNDREJECTED)
    } else if (isRefundProcess(currentStatus.value)) {
      resettoOldStatus()
    } else if (showConfirmationModal(currentStatus.value)) {
      modalDialogClose()
    }
  }

  function resettoOldStatus () {
    // reset to orginal status on toggle
    currentStatus.value = getStatusObject(routingSlipDetails.value.status)
    addMoreDetails.value = false
  }
  // no additional steps needed before calling API
  function directStatusUpdate () {
    return (
      !isRefundProcess(currentStatus.value) &&
      !showConfirmationModal(currentStatus.value)
    )
  }

  // update routign slip status on click of done
  async function updateStatus () {
    // need to call validate only of its refund
    const overrideStatus = currentStatus.value.code === SlipStatus.CANCEL_REFUND_REQUEST ? SlipStatus.REFUNDREJECTED : currentStatus.value.code
    isLoading.value = true
    const statusDetails = {
      status: overrideStatus,
      details: refundRequestDetails.value
    }

    if (isRefundProcess(currentStatus.value)) {
      const status = isApprovalFlow.value
        ? SlipStatus.REFUNDAUTHORIZED
        : overrideStatus
      await updateRefund(status)
    } else {
      await updateRoutingSlipStatus(statusDetails)
      if (showConfirmationModal(currentStatus.value)) {
        modalDialogClose()
      }
      addMoreDetails.value = false
    }
    isLoading.value = false
  }

  function modalDialogClose () {
    modalDialogRef.value.close()
  }

  async function updateRefund (status: any = SlipStatus.REFUNDREQUEST) {
    if (refundRequestForm.value.isValid()) {
      const statusDetails = {
        status: status,
        details: refundRequestDetails.value
      }
      await updateRoutingSlipStatus(statusDetails)
      addMoreDetails.value = false
      isAddressEditable.value = false
    }
  }

  // get label of status
  function getStatusLabel (code: string) {
    return statusLabel(code)
  }
  function isRefundProcess (status) {
    return CommonUtils.isRefundProcessStatus(status?.code)
  }

  function isNSFProcess (status) {
    return status?.code === SlipStatus.NSF
  }

  function isWriteOfProcess (status) {
    return status?.code === SlipStatus.WRITEOFFAUTHORIZED
  }

  function showConfirmationModal (status) {
    return isWriteOfProcess(status) || isNSFProcess(status)
  }

  // TODO where to show error message
  function statusChange (status) {
    // TODO change to computed for supervisor role

    errorMessage.value = ''

    const showAddressStatus = isRefundProcess(status)
    currentStatus.value = status
    //  change to refund status once status available
    if (showAddressStatus && canRequestRefund.value) {
      isAddressEditable.value = true
    } else if (!canRequestRefund.value) {
      // showAddressEditMode.value = false
      errorMessage.value = 'There is not enough funds for refund'
    }
    // isAddressEditable.value = false
    if (directStatusUpdate()) {
      updateStatus()
    } else if (showConfirmationModal(currentStatus.value)) {
      modalDialogRef.value.open()
    } else if (isRefundProcess(currentStatus.value)) {
      addMoreDetails.value = true
    }
  }

  return {
    routingSlip,
    addMoreDetails,
    routingSlipDetails,
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
    isEditable,
    allowedStatusList,
    modalDialogRef,
    modalText,
    isLoading
  }
}
