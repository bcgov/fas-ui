import CommonUtils from '@/util/common-util'

import { computed, ref } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useMutations, useActions } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipDetails () {
  const createRoutingSlipDetailsForm = ref<HTMLFormElement>()
  // state , action , mutation from vuex store
  const { routingSlipDetails } = useState(['routingSlipDetails'])

  const { setRoutingSlipDetails } = useMutations(['setRoutingSlipDetails'])
  const { checkRoutingNumber } = useActions(['checkRoutingNumber'])

  // local variables
  const isUniqueNumber = ref(true)
  const errorMessage = ref('')

  // using same value for getting value and update parent on change
  const number = computed({
    get: () => {
      return routingSlipDetails.value?.number || ''
    },
    set: (modalValue: string) => {
      setRoutingSlipDetails({
        ...routingSlipDetails.value,
        number: modalValue
      })
    }
  })

  const routingSlipDate = computed({
    get: () => {
      return routingSlipDetails.value?.routingSlipDate || ''
    },
    set: (modalValue: Date) => {
      setRoutingSlipDetails({
        ...routingSlipDetails.value,
        routingSlipDate: modalValue
      })
    }
  })

  const accountName = computed({
    get: () => {
      return routingSlipDetails.value?.accountName || ''
    },
    set: (modalValue: string) => {
      setRoutingSlipDetails({
        ...routingSlipDetails.value,
        accountName: modalValue
      })
    }
  })

  // Input field rules
  const numberRules = CommonUtils.requiredFieldRule(
    'A Routing Slip Number is required'
  )
  const routingSlipDateRules = CommonUtils.requiredFieldRule(
    'A Routing Slip Date is required'
  )

  function isValid (): boolean {
    return createRoutingSlipDetailsForm.value?.validate()
  }

  async function checkRoutingNumberAvailable () {
    const isRoutingNumberAvailable = await checkRoutingNumber()

    isUniqueNumber.value = isRoutingNumberAvailable
    // need to show error message if routign slip is not already existing.
    // re-using same vuetify error field set as blank when there are no errors
    errorMessage.value = !isRoutingNumberAvailable
      ? 'Routing Slip number already presents. Enter a new number or edit details of this routing slip'
      : ''
  }

  return {
    createRoutingSlipDetailsForm,
    number,
    routingSlipDate,
    accountName,
    numberRules,
    routingSlipDateRules,
    isValid,
    checkRoutingNumberAvailable,
    routingSlipDetails,
    isUniqueNumber,
    errorMessage
  }
}
