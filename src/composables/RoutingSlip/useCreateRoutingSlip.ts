import { onMounted, ref } from '@vue/composition-api'

import { createNamespacedHelpers } from 'vuex-composition-helpers'
import i18n from '@/plugins/i18n'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions, useState } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlip component
export function useCreateRoutingSlip (_, context) {
  const createRoutingSlipForm = ref<HTMLFormElement>()
  const createRoutingSlipDetailsRef = ref<HTMLFormElement>()
  const createRoutingSlipPaymentRef = ref<HTMLFormElement>()
  const modalDialogRef = ref<HTMLFormElement>()

  // vuex action and state
  const { createRoutingSlip } = useActions(['createRoutingSlip'])
  const { resetRoutingSlipDetails } = useActions(['resetRoutingSlipDetails'])
  const { routingSlipDetails } = useState(['routingSlipDetails'])

  // modal dialog props and events
  const modalDialogTitle = ref<string>('')
  const modalDialogText = ref<string>('')
  const modalDialogOkText = ref<string>('')
  const modalDialogCancelText = ref<string>('')
  const modalDialogIcon = ref<string>('')
  // after creation of routing slip, we display modal dialog as info. If user cancels, we display the same modal dialog as alert.
  const isModalDialogInfo = ref<boolean>(false)

  function isValid (): boolean {
    // We would want to trigger validate() of all the children
    let isValid = createRoutingSlipDetailsRef.value?.isValid()
    isValid = createRoutingSlipPaymentRef.value?.isValid() && isValid
    return isValid
  }

  // Create Routing slip
  async function create () {
    try {
      if (isValid()) {
        await createRoutingSlip()
        displaySuccessNotification()
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error ', error?.response)
    }
  }

  // Cancel Routing slip flow
  function cancel () {
    // Update modal dialog props and display
    modalDialogTitle.value = i18n.t('createRoutingSlipCancelTitle').toString()
    modalDialogIcon.value = 'mdi-alert-circle-outline'
    modalDialogText.value = i18n.t('createRoutingSlipCancelText').toString()
    modalDialogOkText.value = 'Leave'
    modalDialogCancelText.value = 'Cancel'
    isModalDialogInfo.value = false
    modalDialogRef.value.open()
  }

  // Display success
  function displaySuccessNotification () {
    // Update modal dialog props and display
    modalDialogTitle.value = i18n.t('createRoutingSlipSuccessTitle').toString()
    modalDialogIcon.value = 'mdi-check'
    modalDialogText.value = i18n.t('createRoutingSlipSuccessText', { number: routingSlipDetails.value?.number }).toString()
    modalDialogOkText.value = 'Ok'
    isModalDialogInfo.value = true
    modalDialogRef.value.open()
  }

  function modalDialogCancel () {
    modalDialogRef.value.close()
  }

  function modalDialogClose () {
    modalDialogRef.value.close()
    context.root.$router.push('home')
  }

  onMounted(() => {
    resetRoutingSlipDetails()
  })

  return {
    createRoutingSlipForm,
    createRoutingSlipDetailsRef,
    createRoutingSlipPaymentRef,
    modalDialogRef,
    modalDialogTitle,
    modalDialogText,
    modalDialogOkText,
    modalDialogCancelText,
    modalDialogIcon,
    isModalDialogInfo,
    cancel,
    modalDialogCancel,
    modalDialogClose,
    isValid,
    create,
    onMounted
  }
}
