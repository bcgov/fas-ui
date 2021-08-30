import { computed, ref } from '@vue/composition-api'

import { ManualTransactionDetails } from '@/models/RoutingSlip'

// Composable function to inject Props, options and values to RoutingSlipTransaction component
export default function useRoutingSlipTransaction () {
  // UI control variables
  const showAddManualTransaction = ref<boolean>(false)
  const addManualTransactionDetailsRef = ref<HTMLFormElement>()
  const addManualTransactionsList = ref<ManualTransactionDetails[]>([])

  function showManualTransaction (): void {
    // show manual transaction component through toggling showAddManualTransaction
    showAddManualTransaction.value = !showAddManualTransaction.value
  }

  function addManualTransactionRow (): void {
    addManualTransactionDetailsRef.value.addManualTransactionRow()
  }

  function addManualTransactions (): void {
    if (addManualTransactionDetailsRef.value.isValid()) {

    }
  }

  return {
    addManualTransactionDetailsRef,
    showAddManualTransaction,
    addManualTransactionsList,
    showManualTransaction,
    addManualTransactionRow,
    addManualTransactions
  }
}
