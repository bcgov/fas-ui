import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipCashPayment () {
  const receiptNumber = ref(null)
  const totalAmount = ref(null)

  return {
    receiptNumber,
    totalAmount
  }
}
