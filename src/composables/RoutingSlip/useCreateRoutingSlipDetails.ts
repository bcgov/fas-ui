import CommonUtils from '@/util/common-util'
import { RoutingSlipDetails } from '@/models/routingSlip'
import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipDetails () {
  const createRoutingSlipDetailsForm = ref<HTMLFormElement>()
  const number = ref<string>('')
  const routingSlipDate = ref<string>('')
  const accountName = ref<string>('')

  // Input field rules
  const numberRules = CommonUtils.requiredFieldRule('A Routing Slip Number is required')
  const routingSlipDateRules = CommonUtils.requiredFieldRule('A Routing Slip Date is required')

  function isValid (): boolean {
    return createRoutingSlipDetailsForm.value?.validate()
  }

  function getRoutingSlipDetailsInput (): RoutingSlipDetails {
    const routingSlipDetails: RoutingSlipDetails = {
      routingSlipDate: routingSlipDate.value,
      number: number.value,
      accountName: accountName.value
    }
    return routingSlipDetails
  }

  return {
    createRoutingSlipDetailsForm,
    number,
    routingSlipDate,
    accountName,
    numberRules,
    routingSlipDateRules,
    isValid,
    getRoutingSlipDetailsInput
  }
}
