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

  // using same value for getting value and update parent on change
  const number:any = computed({
    get: () => {
      return cashPayment.value.number || ''
    },
    set: (modalValue: any) => {
      setCashPayment({
        ...cashPayment.value,
        number: modalValue,
        paymentMEthod: PaymentMethods.CASH
      })
    }
  })

  // using same value for getting value and update parent on change
  const paidAmount:any = computed({
    get: () => {
      // eslint-disable-next-line no-console
      console.log('cashPayment.value', cashPayment.value)
      return cashPayment.value.paidAmount || null
    },
    set: (modalValue: any) => {
      setCashPayment({
        ...cashPayment.value,
        paidAmount: modalValue,
        paymentMEthod: PaymentMethods.CASH
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
    number,
    paidAmount,
    createRoutingSlipCashPaymentForm,
    receiptNumberRules,
    paidAmountRules,
    isValid

  }
}
