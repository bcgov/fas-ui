import { computed, ref } from '@vue/composition-api'

import { Payment } from '@/models/Payment'
import { PaymentMethods } from '@/util/constants'
import { RoutingSlip } from '@/models/RoutingSlip'
import commonUtil from '@/util/common-util'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useGetters, useActions, useMutations } = routingSlipModule

// Composable function to inject Props, options and values to PaymentInformation component
export default function usePaymentInformation (_, context) {
  // UI control variables
  const isExpanded = ref<boolean>(false)
  const isEditable = ref<boolean>(false)

  // vuex getter and state
  const { routingSlip, linkedRoutingSlips } = useState(['routingSlip', 'linkedRoutingSlips'])
  const { isRoutingSlipAChild, isRoutingSlipLinked } = useGetters(['isRoutingSlipAChild', 'isRoutingSlipLinked'])
  const { adjustRoutingSlip } = useActions(['adjustRoutingSlip'])
  const { updateRoutingSlipAmount, updateRoutingSlipChequeNumber } = useMutations(['updateRoutingSlipAmount', 'updateRoutingSlipChequeNumber'])

  // As per current business rule, a routingslip has one-to-one relation with payment method (Cash/Cheque)
  // Therefore, we can determine the payment method of the current routingslip from the first payment record
  const isPaymentCheque = computed(() => {
    const payments = (routingSlip.value as RoutingSlip)?.payments
    // to prevent lazy load
    return payments && payments[0].paymentMethod === PaymentMethods.CHEQUE
  })

  function adjustRoutingSlipChequeNumber (num: string, i: number = 0) {
    const chequeNumToChange = {
      chequeNum: num,
      idx: i
    }
    updateRoutingSlipChequeNumber(chequeNumToChange)
  }

  function adjustRoutingSlipAmount (num: number, i: number = 0) {
    const amountToChange = {
      amount: num,
      idx: i
    }
    updateRoutingSlipAmount(amountToChange)
  }

  // Backend returns individual routing slip total. Therefore, we need to sum up the children routing slips as well
  const totalAmount = computed(() => {
    let routingSlipTotal = routingSlip.value?.total
    if (isRoutingSlipLinked.value === true && isRoutingSlipAChild.value === false) {
      // this means it is a parent routing slip
      const linkedRoutingSlipsTotal = linkedRoutingSlips.value.children.reduce((acc, routingSlip: RoutingSlip) => {
        return acc + routingSlip.total
      }, 0)
      routingSlipTotal += linkedRoutingSlipsTotal
    }
    return routingSlipTotal ? commonUtil.appendCurrencySymbol(routingSlipTotal.toFixed(2)) : '$0.00'
  })

  const remainingAmount = computed(() => {
    return routingSlip.value.remainingAmount ? commonUtil.appendCurrencySymbol(routingSlip.value.remainingAmount.toFixed(2)) : '$0.00'
  })

  const isRoutingSlipPaidInUsd = computed(() => {
    return routingSlip.value.totalUsd && routingSlip.value.totalUsd > 0
  })

  const isRoutingSlipChildPaidInUsd = computed(() => {
    return linkedRoutingSlips.value && linkedRoutingSlips.value.children.length > 0 && linkedRoutingSlips.value.children[0].totalUsd && linkedRoutingSlips.value.children[0].totalUsd > 0
  })

  function adjustRoutingSlipHandler () {
    try {
      adjustRoutingSlip()
      isEditable.value = !isEditable.value
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('error ', error?.response)
    }
  }

  function adjustRoutingSlipStatus () {
    isEditable.value = !isEditable.value
  }

  function viewPaymentInformation (): void {
    // expand/collapse view payment information children
    // update the cheque store if payment method is cheque, cash store otherwise
    isExpanded.value = !isExpanded.value
  }

  const appendQueryParamsIfNeeded = commonUtil.appendQueryParamsIfNeeded

  function navigateTo (routingSlipNumber: number, childNumber: number): string {
    const route = context.root.$route
    return appendQueryParamsIfNeeded(`/view-routing-slip/${routingSlipNumber}/${childNumber}`, route)
  }

  return {
    routingSlip,
    isExpanded,
    isEditable,
    isPaymentCheque,
    linkedRoutingSlips,
    isRoutingSlipAChild,
    isRoutingSlipLinked,
    isRoutingSlipChildPaidInUsd,
    totalAmount,
    remainingAmount,
    isRoutingSlipPaidInUsd,
    adjustRoutingSlipChequeNumber,
    adjustRoutingSlipAmount,
    adjustRoutingSlipHandler,
    adjustRoutingSlipStatus,
    viewPaymentInformation,
    navigateTo
  }
}
