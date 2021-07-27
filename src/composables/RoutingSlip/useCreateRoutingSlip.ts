import { reactive, ref } from '@vue/composition-api'

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
  const isLoading = ref<boolean>(false)

  // vuex action and state
  const { createRoutingSlip } = useActions([
    'createRoutingSlip'
  ])
  const { routingSlipDetails } = useState(['routingSlipDetails'])

  // modal dialog props and events
  const modalDialogDetails = reactive<any>({
    modalDialogTitle: '',
    modalDialogText: '',
    modalDialogOkText: '',
    modalDialogCancelText: '',
    modalDialogIcon: ''
  })
  // after creation of routing slip, we display modal dialog as info. If user cancels, we display the same modal dialog as alert.
  const isModalDialogInfo = ref<boolean>(false)

  function isValid (): boolean {
    // We would want to trigger validate() of all the children
    let isChildrenValid = createRoutingSlipDetailsRef.value?.isValid()
    isChildrenValid =
      createRoutingSlipPaymentRef.value?.isValid() && isChildrenValid
    return isChildrenValid
  }

  // Create Routing slip
  async function create () {
    try {
      if (isValid()) {
        isLoading.value = true
        await createRoutingSlip()
        // on success redirect to view
        context.root.$router.push({
          path: `/view-routing-slip/${routingSlipDetails.value.number}`
        })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error ', error?.response)
    } finally {
      isLoading.value = false
    }
  }

  // Cancel Routing slip flow
  function cancel () {
    // Update modal dialog props and display
    modalDialogDetails.modalDialogTitle = i18n
      .t('createRoutingSlipCancelTitle')
      .toString()
    modalDialogDetails.modalDialogIcon = 'mdi-alert-circle-outline'
    modalDialogDetails.modalDialogText = i18n
      .t('createRoutingSlipCancelText')
      .toString()
    modalDialogDetails.modalDialogOkText = 'Leave'
    modalDialogDetails.modalDialogCancelText = 'Cancel'
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
    modalDialogDetails,
    isModalDialogInfo,
    isLoading,
    cancel,
    modalDialogCancel,
    modalDialogClose,
    isValid,
    create
  }
}
