import { computed, ref } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { PaymentMethods } from '@/util/constants'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useMutations } = routingSlipModule

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipCashPayment () {
  const createRoutingSlipCashPaymentForm = ref<HTMLFormElement>()

  // state, action, mutation from vuex store
  const { routingSlipCashPayment } = useState(['routingSlipCashPayment'])
  const { setRoutingSlipCashPayment } = useMutations(['setRoutingSlipCashPayment'])

  // Input field rules
  const receiptNumberRules = CommonUtils.requiredFieldRule('A Receipt number is required')
  const paidAmountRules = CommonUtils.requiredFieldRule('Paid Amount is required')

  // using same value for getting value and update parent on change
  const number = computed({
    get: () => {
      return routingSlipCashPayment.value?.number || ''
    },
    set: (modalValue: string) => {
      setRoutingSlipCashPayment({
        ...routingSlipCashPayment.value,
        number: modalValue,
        // Update payment method as cash
        paymentMethod: PaymentMethods.CASH
      })
    }
  })

  const paidAmount = computed({
    get: () => {
      return routingSlipCashPayment.value?.number || ''
    },
    set: (modalValue: string) => {
      setRoutingSlipCashPayment({
        ...routingSlipCashPayment.value,
        paidAmount: modalValue,
        // Update payment method as cash
        paymentMethod: PaymentMethods.CASH
      })
    }
  })

  function isValid (): boolean {
    return createRoutingSlipCashPaymentForm.value?.validate()
  }

  return {
    number,
    paidAmount,
    createRoutingSlipCashPaymentForm,
    receiptNumberRules,
    paidAmountRules,
    isValid
  }
}
