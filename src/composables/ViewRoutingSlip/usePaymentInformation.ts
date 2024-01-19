import { AdjustRoutingSlipAmountPrams, AdjustRoutingSlipChequePrams, GetRoutingSlipRequestPayload, RoutingSlip } from '@/models/RoutingSlip'
import { PaymentMethods, SlipStatus } from '@/util/constants'
import { computed, ref } from 'vue'
import { Payment } from '@/models/Payment'
import commonUtil from '@/util/common-util'
import { useRoute } from 'vue-router'
import { useRoutingSlip } from '../useRoutingSlip'

const routingSlipBeforeEdit = ref<RoutingSlip>({})

// Composable function to inject Props, options and values to PaymentInformation component
export default function usePaymentInformation () {
  const {
    adjustRoutingSlip,
    getRoutingSlip,
    isRoutingSlipAChild,
    isRoutingSlipLinked,
    linkedRoutingSlips,
    routingSlip,
    updateRoutingSlipAmount,
    updateRoutingSlipChequeNumber
  } = useRoutingSlip()
  // UI control variables
  const isExpanded = ref<boolean>(false)
  const isEditable = ref<boolean>(false)

  // vuex getter and state

  // As per current business rule, a routingslip has one-to-one relation with payment method (Cash/Cheque)
  // Therefore, we can determine the payment method of the current routingslip from the first payment record
  const isPaymentCheque = computed(() => {
    const payments = (routingSlip.value as RoutingSlip)?.payments
    // to prevent lazy load
    return payments && payments[0].paymentMethod === PaymentMethods.CHEQUE
  })

  const displayEditRoutingSlip = computed(() => {
    return !isEditable.value && isExpanded.value &&
        routingSlip.value && routingSlip.value.payments
  })

  const enableEditRoutingSlip = computed(() => {
    return [SlipStatus.ACTIVE, SlipStatus.COMPLETE, SlipStatus.CORRECTION].includes(routingSlip.value.status as SlipStatus)
  })

  function adjustRoutingSlipChequeNumber (num: string, paymentIndex = 0) {
    const chequeNumToChange: AdjustRoutingSlipChequePrams = {
      chequeNum: num,
      paymentIndex: paymentIndex
    }
    updateRoutingSlipChequeNumber(chequeNumToChange)
  }

  function adjustRoutingSlipAmount (num: number, isUsdChange: boolean, paymentIndex = 0) {
    const amountToChange: AdjustRoutingSlipAmountPrams = {
      amount: Number(num),
      paymentIndex: paymentIndex,
      isRoutingSlipPaidInUsd: isUsdChange
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
    return linkedRoutingSlips.value && linkedRoutingSlips.value.children.length > 0 &&
      linkedRoutingSlips.value.children[0].totalUsd && linkedRoutingSlips.value.children[0].totalUsd > 0
  })

  const hasPaymentChanges = computed(() => {
    return !commonUtil.isDeepEqual(routingSlip.value, routingSlipBeforeEdit.value)
  })

  const filterUnchangedChequeReceiptNumbersFromPayment = () => {
    const paymentRequest: Payment[] = routingSlip.value.payments
    paymentRequest.forEach((payment, index) => {
      if (payment.chequeReceiptNumber === routingSlipBeforeEdit.value?.payments[index]?.chequeReceiptNumber) {
        delete payment.chequeReceiptNumber
      }
    })
    return paymentRequest
  }

  async function adjustRoutingSlipHandler () {
    const paymentRequest: Payment[] = filterUnchangedChequeReceiptNumbersFromPayment()
    await adjustRoutingSlip(paymentRequest)
    adjustRoutingSlipStatus()
    const getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload = { routingSlipNumber: routingSlip.value.number }
    await getRoutingSlip(getRoutingSlipRequestPayload)
  }

  function adjustRoutingSlipStatus () {
    isEditable.value = !isEditable.value
  }

  function cancelRoutingSlipAdjust () {
    adjustRoutingSlipStatus()
  }

  function cancelEditPayment () {
    routingSlip.value = routingSlipBeforeEdit.value
    adjustRoutingSlipStatus()
  }
  function editPayment () {
    routingSlipBeforeEdit.value = JSON.parse(JSON.stringify(routingSlip.value))
    adjustRoutingSlipStatus()
  }

  function viewPaymentInformation (): void {
    // expand/collapse view payment information children
    // update the cheque store if payment method is cheque, cash store otherwise
    isExpanded.value = !isExpanded.value
  }

  const appendQueryParamsIfNeeded = commonUtil.appendQueryParamsIfNeeded

  function navigateTo (routingSlipNumber: number, childNumber: number): string {
    return appendQueryParamsIfNeeded(`/view-routing-slip/${routingSlipNumber}/${childNumber}`, useRoute())
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
    displayEditRoutingSlip,
    enableEditRoutingSlip,
    adjustRoutingSlipChequeNumber,
    adjustRoutingSlipAmount,
    adjustRoutingSlipHandler,
    adjustRoutingSlipStatus,
    cancelEditPayment,
    editPayment,
    cancelRoutingSlipAdjust,
    viewPaymentInformation,
    navigateTo,
    hasPaymentChanges
  }
}
