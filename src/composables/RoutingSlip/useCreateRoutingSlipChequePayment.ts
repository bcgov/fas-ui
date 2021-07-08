import { computed, onMounted, ref } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { Payment } from '@/models/Payment'
import { PaymentMethods } from '@/util/constants'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipChequePayment () {
  const chequeList = ref<Payment[]>([])
  const createRoutingSlipChequePaymentForm = ref<HTMLFormElement>()

  // Input field rules
  const chequeNumberRules = CommonUtils.requiredFieldRule('A Cheque number is required')
  const paidAmountRules = CommonUtils.requiredFieldRule('Paid Amount is required')

  // Compute individual cheque paid amount to calculate total paid amount
  const totalAmount = computed(() => {
    return chequeList.value.reduce((acc, payment: Payment) => {
      return acc + payment.paidAmount
    }, 0)
    // return value
  })

  // By default, we have one cheque row in UI
  onMounted(() => {
    addCheque()
  })

  // For UI Cheque list - start
  function getIndexedTag (tag: string, index: number): string {
    return `${tag}-${index}`
  }

  function removeCheque (index: number) {
    chequeList.value.splice(index, 1)
  }

  function getDefaultRow (): Payment {
    return { chequeReceiptNumber: '', paidAmount: null, paymentDate: '', paymentMethod: PaymentMethods.CHEQUE }
  }

  function addCheque () {
    chequeList.value.push(getDefaultRow())
  }
  // For UI Cheque list - end

  function isValid (): boolean {
    return createRoutingSlipChequePaymentForm.value?.validate()
  }

  function getRoutingSlipChequesInput (): Payment[] {
    // to avoid passing observer array, we send in a copy
    return JSON.parse(JSON.stringify(chequeList.value))
  }

  return {
    totalAmount,
    chequeList,
    createRoutingSlipChequePaymentForm,
    chequeNumberRules,
    paidAmountRules,
    onMounted,
    getDefaultRow,
    getIndexedTag,
    addCheque,
    removeCheque,
    isValid,
    getRoutingSlipChequesInput
  }
}
