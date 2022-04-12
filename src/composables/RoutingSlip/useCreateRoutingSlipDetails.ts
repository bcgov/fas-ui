import { computed, ref } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import moment from 'moment'
import { ApiErrors } from '@/util/constants'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useMutations, useActions } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipDetails () {
  const createRoutingSlipDetailsForm = ref<HTMLFormElement>()

  // state , action , mutation from vuex store
  const { routingSlipDetails, accountInfo } = useState(['routingSlipDetails', 'accountInfo'])
  const { setRoutingSlipDetails, setAccountInfo } = useMutations(['setRoutingSlipDetails', 'setAccountInfo'])
  const { checkRoutingNumber } = useActions(['checkRoutingNumber'])

  // local variables
  const errorMessage = ref<string>('')

  // using same v-model value for getting value and update parent on change
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
      return routingSlipDetails.value?.routingSlipDate
    },
    set: (modalValue: string) => {
      setRoutingSlipDetails({
        ...routingSlipDetails.value,
        routingSlipDate: modalValue
      })
    }
  })

  // Initialize with current date.
  if (routingSlipDate.value === undefined) {
    routingSlipDate.value = moment().format('YYYY-MM-DD')
  }

  const accountName = computed({
    get: () => {
      return accountInfo.value?.accountName || ''
    },
    set: (modalValue: string) => {
      setAccountInfo({
        accountName: modalValue
      })
    }
  })

  // Input field rules
  const numberRules = [
    v => !!v || 'A Routing Slip Number is required',
    v => (v.length === 9) || 'A Routing Slip Number must be 9 characters long',
    v => {
      const pattern = /^\d+$/
      return pattern.test(v) || 'Valid Routing Slip Number is required'
    }
  ]

  const routingSlipDateRules = CommonUtils.requiredFieldRule(
    'A Routing Slip Date is required'
  )
  const entityNumberRules = CommonUtils.requiredFieldRule(
    'An Entity Number is required'
  )

  function isValid (): boolean {
    // Current version of Vuetify returns validate() as true even if :error-message is not null on v-text-field
    return createRoutingSlipDetailsForm.value?.validate() && errorMessage.value?.length === 0
  }

  async function checkRoutingNumberAvailable () {
    if (number.value?.length > 0) {
      const validateRoutingNumber = await checkRoutingNumber()
      const routingNumberExists = validateRoutingNumber === 'exists'
      const invalidRoutingSlipDigits = validateRoutingNumber === 'invalidDigits'

      // need to show error message if routing slip exists.
      // re-using same vuetify error field set as blank when there are no errors
      const errorMessageSuffix = 'Enter a new number or edit details of this routing slip'
      if (routingNumberExists) {
        errorMessage.value = `Routing Slip number already present. ${errorMessageSuffix}`
      } else if (invalidRoutingSlipDigits) {
        errorMessage.value = `Routing Slip number is invalid. ${errorMessageSuffix}`
      } else {
        errorMessage.value = ''
      }
    }
  }

  return {
    createRoutingSlipDetailsForm,
    number,
    routingSlipDate,
    accountName,
    numberRules,
    routingSlipDateRules,
    entityNumberRules,
    routingSlipDetails,
    errorMessage,
    isValid,
    checkRoutingNumberAvailable
  }
}
