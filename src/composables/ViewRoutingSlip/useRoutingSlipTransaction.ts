import { ManualTransactionDetails } from '@/models/RoutingSlip'
import Vue from 'vue'
import { ref } from '@vue/composition-api'

// Composable function to inject Props, options and values to RoutingSlipTransaction component
export default function useRoutingSlipTransaction () {
  // UI control variables
  const showAddManualTransaction = ref<boolean>(false)
  const formRoutingSlipManualTransactions = ref<HTMLFormElement>()
  const manualTransactionsList = ref<ManualTransactionDetails[]>([])

  function showManualTransaction (): void {
    // Show manual transaction component through toggling showAddManualTransaction
    showAddManualTransaction.value = !showAddManualTransaction.value
    // And add a default row to the manual transaction list
    addManualTransactionRow()
  }

  function addManualTransactions (): void {
    if (isValid()) {
    }
  }

  // Divider not visible if array is 1 OR last array element
  function isDividerVisible (index: number): boolean {
    const length = manualTransactionsList.value.length - 1
    return index !== length
  }

  function getDefaultRow (): ManualTransactionDetails {
    // by default, the flags futureFiling, priority are false
    return { futureFiling: false, priority: false } as ManualTransactionDetails
  }

  function addManualTransactionRow () {
    manualTransactionsList.value.push(getDefaultRow())
  }

  function isValid (): boolean {
    return formRoutingSlipManualTransactions.value.validate()
  }

  function removeManualTransactionRow (index: number) {
    manualTransactionsList.value.splice(index, 1)
  }

  async function updateManualTransactionDetails (transaction: ManualTransactionDetails, index: number) {
    manualTransactionsList.value[index] = transaction
  }

  return {
    formRoutingSlipManualTransactions,
    showAddManualTransaction,
    manualTransactionsList,
    showManualTransaction,
    addManualTransactionRow,
    addManualTransactions,
    isDividerVisible,
    isValid,
    removeManualTransactionRow,
    updateManualTransactionDetails
  }
}
