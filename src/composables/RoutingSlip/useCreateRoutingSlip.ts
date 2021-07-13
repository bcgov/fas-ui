import { onMounted, reactive, ref } from '@vue/composition-api'

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
  const { createRoutingSlip, resetRoutingSlipDetails } = useActions(['createRoutingSlip', 'resetRoutingSlipDetails'])
  const { routingSlipDetails } = useState(['routingSlipDetails'])

  // modal dialog props and events
  const modalDialogDetails = reactive<any>({
    modalDialogTitle: '',
    modalDialogText: '',
    modalDialogOkText: '',
    modalDialogCancelText: '',
    modalDialogIcon: ''
  })
  /* const modalDialogTitle = ref<string>('')
  const modalDialogText = ref<string>('')
  const modalDialogOkText = ref<string>('')
  const modalDialogCancelText = ref<string>('')
  const modalDialogIcon = ref<string>('') */
  // after creation of routing slip, we display modal dialog as info. If user cancels, we display the same modal dialog as alert.
  const isModalDialogInfo = ref<boolean>(false)

  function isValid (): boolean {
    // We would want to trigger validate() of all the children
    let isChildrenValid = createRoutingSlipDetailsRef.value?.isValid()
    isChildrenValid = createRoutingSlipPaymentRef.value?.isValid() && isChildrenValid
    return isChildrenValid
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
    modalDialogDetails.modalDialogTitle = i18n.t('createRoutingSlipCancelTitle').toString()
    modalDialogDetails.modalDialogIcon = 'mdi-alert-circle-outline'
    modalDialogDetails.modalDialogText = i18n.t('createRoutingSlipCancelText').toString()
    modalDialogDetails.modalDialogOkText = 'Leave'
    modalDialogDetails.modalDialogCancelText = 'Cancel'
    isModalDialogInfo.value = false
    modalDialogRef.value.open()
  }

  // Display success
  function displaySuccessNotification () {
    // Update modal dialog props and display
    modalDialogDetails.modalDialogTitle = i18n.t('createRoutingSlipSuccessTitle').toString()
    modalDialogDetails.modalDialogIcon = 'mdi-check'
    modalDialogDetails.modalDialogText = i18n.t('createRoutingSlipSuccessText', { number: routingSlipDetails.value?.number }).toString()
    modalDialogDetails.modalDialogOkText = 'Ok'
    isModalDialogInfo.value = true
    modalDialogRef.value.open()
  }

  function modalDialogCancel () {
    modalDialogRef.value.close()
  }

  function modalDialogClose () {
    modalDialogRef.value.close()
    context.root.$router.push('home')
    resetRoutingSlipDetails()
  }

  return {
    createRoutingSlipForm,
    createRoutingSlipDetailsRef,
    createRoutingSlipPaymentRef,
    modalDialogRef,
    modalDialogDetails,
    isModalDialogInfo,
    cancel,
    modalDialogCancel,
    modalDialogClose,
    isValid,
    create
  }
}
