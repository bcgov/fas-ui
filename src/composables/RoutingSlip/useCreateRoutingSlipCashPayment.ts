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
  const { cashPayment } = useState(['cashPayment'])
  const { setCashPayment } = useMutations(['setCashPayment'])

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

  // Input field rules
  const receiptNumberRules = CommonUtils.requiredFieldRule('A Receipt number is required')
  const paidAmountRules = CommonUtils.requiredFieldRule('Paid Amount is required')

  function isValid (): boolean {
    return createRoutingSlipCashPaymentForm.value?.validate()
  }

  return {
    chequeReceiptNumber,
    paidAmount,
    createRoutingSlipCashPaymentForm,
    receiptNumberRules,
    paidAmountRules,
    isValid

  }
}
