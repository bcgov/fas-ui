import { ManualTransactionDetails } from '@/models/RoutingSlip'
import { createNamespacedHelpers } from 'vuex-composition-helpers'
import { ref } from '@vue/composition-api'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useGetters } = routingSlipModule

// Composable function to inject Props, options and values to RoutingSlipTransaction component
export default function useRoutingSlipTransaction () {
  // UI control variables
  const showAddManualTransaction = ref<boolean>(false)
  const formRoutingSlipManualTransactions = ref<HTMLFormElement>()
  const manualTransactionsList = ref<ManualTransactionDetails[]>([])

  const { isRoutingSlipAChild } = useGetters(['isRoutingSlipAChild'])

  function showManualTransaction (): void {
    // Show manual transaction component through toggling showAddManualTransaction
    // only show the component and not toggle it back to hide the component
    if (!showAddManualTransaction.value) {
      showAddManualTransaction.value = !showAddManualTransaction.value
      // And add a default row to the manual transaction list, if list is empty
      if (manualTransactionsList.value.length === 0) {
        addManualTransactionRow()
      }
    }
  }

  function addManualTransactions (): void {
    if (isValid()) {
    }
  }

  // Divider not visible if array is 1 OR last array element
  function isLastChild (index: number): boolean {
    const length = manualTransactionsList.value.length - 1
    return index !== length
  }

  function getDefaultRow (): ManualTransactionDetails {
    // By default, the flags futureFiling, priority are false
    return {
      futureFiling: false,
      priority: false,
      total: null,
      referenceNumber: null,
      filingType: null
    } as ManualTransactionDetails
  }

  // Add one row to the list
  function addManualTransactionRow () {
    manualTransactionsList.value.push(getDefaultRow())
  }

  function isValid (): boolean {
    return formRoutingSlipManualTransactions.value.validate()
  }

  // Remove one row to the list
  function removeManualTransactionRow (index: number) {
    manualTransactionsList.value.splice(index, 1)
  }

  /* Update the record to keep it up to date with the inptu changes happening in the child transaction
  Cannot use output-sync or v-model, since it is not allowed on iterable list;
  therefore using event listener, we update the properties of the parent list elements
  */
  async function updateManualTransactionDetails (transaction: ManualTransactionDetails, index: number) {
    manualTransactionsList.value[index] = { ...transaction }
  }

  function hideManualTransaction (): void {
    if (showAddManualTransaction.value) {
      showAddManualTransaction.value = !showAddManualTransaction.value
    }
  }

  return {
    formRoutingSlipManualTransactions,
    showAddManualTransaction,
    manualTransactionsList,
    isRoutingSlipAChild,
    showManualTransaction,
    addManualTransactionRow,
    addManualTransactions,
    isLastChild,
    isValid,
    removeManualTransactionRow,
    updateManualTransactionDetails,
    hideManualTransaction
  }
}
