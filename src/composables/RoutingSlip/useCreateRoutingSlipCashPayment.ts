import { computed, onMounted, ref } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { PaymentMethods } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useMutations } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipCashPayment () {
  const createRoutingSlipCashPaymentForm = ref<HTMLFormElement>()

  // vuex state and mutations
  const { cashPayment } = useState(['cashPayment'])
  const { setCashPayment } = useMutations(['setCashPayment'])

  const isAmountPaidInUsd = ref<boolean>(false)

  // using same v-model value for getting value and update parent on change
  const chequeReceiptNumber:any = computed({
    get: () => {
      return cashPayment.value.chequeReceiptNumber || ''
    },
    set: (modalValue: any) => {
      setCashPayment({
        ...cashPayment.value,
        chequeReceiptNumber: modalValue,
        paymentMethod: PaymentMethods.CASH
      })
    }
  })

  // using same v-model value for getting value and update parent on change
  const paidAmount:any = computed({
    get: () => {
      return cashPayment.value.paidAmount || null
    },
    set: (modalValue: any) => {
      setCashPayment({
        ...cashPayment.value,
        paidAmount: modalValue,
        paymentMethod: PaymentMethods.CASH
      })
    }
  })

  // using same v-model value for getting value and update parent on change
  const paidUsdAmount:any = computed({
    get: () => {
      return cashPayment.value.paidUsdAmount || null
    },
    set: (modalValue: any) => {
      setCashPayment({
        ...cashPayment.value,
        paidUsdAmount: modalValue,
        paymentMethod: PaymentMethods.CASH
      })
    }
  })

  // Input field rules
  const receiptNumberRules = CommonUtils.requiredFieldRule('A Receipt number is required')
  const paidAmountRules = CommonUtils.requiredFieldRule('Paid Amount is required')
  const paidUsdAmountRules = CommonUtils.requiredFieldRule('Paid Amount in USD is required')

  const getColumnWidth = computed(() => {
    return isAmountPaidInUsd.value ? 4 : 6
  })

  function isValid (): boolean {
    return createRoutingSlipCashPaymentForm.value?.validate()
  }

  onMounted(() => {
    // Check if payment has USD values, then set flag back to true - handle case when clicking back from review page
    isAmountPaidInUsd.value = cashPayment.value.paidUsdAmount > 0
  })

  function changeAmountPaidInUsd () {
    if (!isAmountPaidInUsd.value) {
      setCashPayment({
        ...cashPayment.value,
        paidUsdAmount: 0
      })
    }
  }

  return {
    chequeReceiptNumber,
    paidAmount,
    paidUsdAmount,
    createRoutingSlipCashPaymentForm,
    receiptNumberRules,
    paidAmountRules,
    paidUsdAmountRules,
    isValid,
    isAmountPaidInUsd,
    getColumnWidth,
    changeAmountPaidInUsd
  }
}
