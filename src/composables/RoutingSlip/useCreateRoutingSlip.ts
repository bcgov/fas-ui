import VueI18n from 'vue-i18n'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import i18n from '@/plugins/i18n'
import { ref } from '@vue/composition-api'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlip component
export function useCreateRoutingSlip (_, context) {
  const createRoutingSlipForm = ref<HTMLFormElement>()
  const createRoutingSlipDetailsRef = ref<HTMLFormElement>()
  const createRoutingSlipPaymentRef = ref<HTMLFormElement>()
  const modalDialogRef = ref<HTMLFormElement>()

  // modal dialog props and events
  const modalDialogTitle = ref<string>('')
  const modalDialogText = ref<string>('')
  const modalDialogOkText = ref<string>('')
  const modalDialogCancelText = ref<string>('')
  const modalDialogIcon = ref<string>('')
  // after creation of routing slip, we display modal dialog as info. If user cancels, we display the same modal dialog as alert.
  const isModalDialogInfo = ref<boolean>(false)

  const { createRoutingSlip } = useActions(['createRoutingSlip'])

  function isValid (): boolean {
    // We would want to trigger validate() for all the children
    let isValidForm = createRoutingSlipDetailsRef.value?.isValid()
    isValidForm = createRoutingSlipPaymentRef.value?.isValid() && isValidForm
    return isValidForm
  }

  // Create Routing slip
  function createRoutingSlipNow () {
    if (isValid()) {
      createRoutingSlip()
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

  function modalDialogCancel () {
    modalDialogRef.value.close()
  }

  function modalDialogClose () {
    modalDialogRef.value.close()
    context.root.$router.push('home')
  }

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
    createRoutingSlipNow,
    cancel,
    modalDialogCancel,
    modalDialogClose,
    isValid
  }
}
