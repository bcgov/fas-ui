import CommonUtils from '@/util/common-util'
import { Payment } from '@/models/Payment'
import { PaymentMethods } from '@/util/constants'
import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipCashPayment () {
  const number = ref<string>('')
  const paidAmount = ref<number>(null)
  const createRoutingSlipCashPaymentForm = ref<HTMLFormElement>()

  // Input field rules
  const receiptNumberRules = CommonUtils.requiredFieldRule('A Receipt number is required')
  const paidAmountRules = CommonUtils.requiredFieldRule('Paid Amount is required')

  function isValid (): boolean {
    return createRoutingSlipCashPaymentForm.value?.validate()
  }

  function getRoutingSlipCashInput (): Payment {
    const cash: Payment = {
      chequeReceiptNumber: number.value,
      paidAmount: paidAmount.value,
      paymentMethod: PaymentMethods.CASH
    }
    return cash
  }

  return {
    number,
    paidAmount,
    createRoutingSlipCashPaymentForm,
    receiptNumberRules,
    paidAmountRules,
    isValid,
    getRoutingSlipCashInput
  }
}
