import { computed, onMounted, ref, watch } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { Payment } from '@/models/Payment'
import { PaymentMethods } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useMutations, useState } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipChequePayment () {
  const chequeList = ref<Payment[]>([])
  const createRoutingSlipChequePaymentForm = ref<HTMLFormElement>()
  const isAmountPaidInUsd = ref<boolean>(false)

  const { chequePayment } = useState(['chequePayment'])
  const { setChequePayment } = useMutations(['setChequePayment'])

  // watch any changes and update to store
  watch(chequeList, () => {
    // to avoid vuex array, send clone copy of object
    setChequePayment(JSON.parse(JSON.stringify(chequeList.value)))
  }, { deep: true })

  // Input field rules
  const chequeNumberRules = CommonUtils.requiredFieldRule('A Cheque number is required')
  const paidAmountRules = CommonUtils.requiredFieldRule('Paid Amount is required')
  const paidUsdAmountRules = CommonUtils.requiredFieldRule('Paid Amount in USD is required')

  // Compute individual cheque paid amount to calculate total paid amount
  const totalAmount = computed(() => {
    return chequeList.value.reduce((acc, payment: Payment) => {
      return acc + payment.paidAmount
    }, 0)
    // return value
  })

  // By default, we have one cheque row in UI
  onMounted(() => {
    if (chequePayment.value.length > 0) {
      chequeList.value = chequePayment.value.slice(0)
    } else {
      addCheque()
    }
    // Check if payment has USD values, then set flag back to true - handle case when clicking back from review page
    isAmountPaidInUsd.value = chequeList.value.some((payment: Payment) => payment.paidUsdAmount > 0)
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

  const getColumnWidth = computed(() => {
    return isAmountPaidInUsd.value ? 3 : 4
  })

  function changeAmountPaidInUsd () {
    if (!isAmountPaidInUsd.value) {
      chequeList.value.forEach((payment: Payment) => {
        payment.paidUsdAmount = 0
      })
    }
  }

  return {
    totalAmount,
    chequeList,
    createRoutingSlipChequePaymentForm,
    chequeNumberRules,
    paidAmountRules,
    paidUsdAmountRules,
    isAmountPaidInUsd,
    getDefaultRow,
    getIndexedTag,
    addCheque,
    removeCheque,
    isValid,
    getColumnWidth,
    changeAmountPaidInUsd
  }
}
