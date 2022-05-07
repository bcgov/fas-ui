import { computed, ref } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { PaymentMethods } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useMutations } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipCashPayment () {
  const createRoutingSlipCashPaymentForm = ref<HTMLFormElement>()

  // vuex state and mutations
  const { cashPayment, isAmountPaidInUsd } = useState(['cashPayment', 'isAmountPaidInUsd'])
  const { setCashPayment, setIsAmountPaidInUsd } = useMutations(['setCashPayment', 'setIsAmountPaidInUsd'])

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

  const isTheAmountPaidInUsd = computed({
    get: () => {
      return isAmountPaidInUsd.value
    },
    set: (modalValue: any) => {
      setIsAmountPaidInUsd(modalValue)
    }
  })

  // Input field rules
  const receiptNumberRules = CommonUtils.requiredFieldRule('A Receipt number is required')

  const paidUsdAmountRules = [
    v => !!v || 'Paid Amount in USD is required',
    v => v && (/^\d+(\.\d{1,2})?$/.test(v) || 'Paid Amount in USD can only be up to 2 decimal places')
  ]

  const paidAmountRules = [
    v => !!v || 'Paid Amount is required',
    v => {
      return v >= 0 || 'Valid Paid Amount is required'
    },
    v => (/^\d+(\.\d{1,2})?$/.test(v) || 'Paid Amount can only be up to 2 decimal places')
  ]

  const getColumnWidth = computed(() => {
    return isTheAmountPaidInUsd.value ? 4 : 6
  })

  function isValid (): boolean {
    return createRoutingSlipCashPaymentForm.value?.validate()
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
    isTheAmountPaidInUsd,
    getColumnWidth
  }
}
