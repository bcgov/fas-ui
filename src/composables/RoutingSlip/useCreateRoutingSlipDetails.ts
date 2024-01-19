import { computed, ref } from 'vue'

import CommonUtils from '@/util/common-util'
import { CreateRoutingSlipStatus } from '@/util/constants'
import { DateTime } from 'luxon'
import { useRoutingSlip } from '../useRoutingSlip'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipDetails () {
  const { accountInfo, checkRoutingNumber, routingSlipDetails } = useRoutingSlip()
  const createRoutingSlipDetailsForm = ref<HTMLFormElement>()

  // local variables
  const errorMessage = ref<string>('')

  // using same v-model value for getting value and update parent on change
  const number = computed({
    get: () => {
      return routingSlipDetails.value?.number || ''
    },
    set: (modalValue: string) => {
      routingSlipDetails.value = {
        ...routingSlipDetails.value,
        number: modalValue
      }
    }
  })

  const routingSlipDate = computed({
    get: () => {
      return routingSlipDetails.value?.routingSlipDate
    },
    set: (modalValue: string) => {
      routingSlipDetails.value = {
        ...routingSlipDetails.value,
        routingSlipDate: modalValue
      }
    }
  })

  // Initialize with current date.
  if (routingSlipDate.value === undefined) {
    routingSlipDate.value = DateTime.now().toFormat('yyyy-LL-dd')
  }

  const accountName = computed({
    get: () => {
      return accountInfo.value?.accountName || ''
    },
    set: (modalValue: string) => {
      accountInfo.value = {
        accountName: modalValue
      }
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

  async function isValid (): Promise<boolean> {
    return (await createRoutingSlipDetailsForm.value.validate()).length === 0
  }

  async function checkRoutingNumberAvailable () {
    if (number.value?.length > 0) {
      const validateRoutingNumber = await checkRoutingNumber()
      // need to show error message if routing slip exists.
      // re-using same vuetify error field set as blank when there are no errors
      const errorMessageSuffix = 'Enter a new number or edit details of this routing slip'
      switch (validateRoutingNumber) {
        case CreateRoutingSlipStatus.EXISTS:
          errorMessage.value = `Routing Slip number already present. ${errorMessageSuffix}`
          break
        case CreateRoutingSlipStatus.INVALID_DIGITS:
          errorMessage.value = `Routing Slip number is invalid. ${errorMessageSuffix}`
          break
        default:
        case CreateRoutingSlipStatus.VALID:
          errorMessage.value = ''
          break
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
