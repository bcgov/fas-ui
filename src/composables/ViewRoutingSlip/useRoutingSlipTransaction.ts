import { ManualTransactionDetails } from '@/models/RoutingSlip'
import { ref } from '@vue/composition-api'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState, useActions } = routingSlipModule

// Composable function to inject Props, options and values to RoutingSlipTransaction component
export default function useRoutingSlipTransaction () {
  // UI control variables
  const showAddManualTransaction = ref<boolean>(false)
  const formRoutingSlipManualTransactions = ref<HTMLFormElement>()
  const manualTransactionsList = ref<ManualTransactionDetails[]>([])
  const { saveManualTransactions, getRoutingSlip } = useActions([
    'saveManualTransactions',
    'getRoutingSlip'
  ])

  const { routingSlip } = useState(['routingSlip'])

  function showManualTransaction (): void {
    // Show manual transaction component through toggling showAddManualTransaction
    showAddManualTransaction.value = !showAddManualTransaction.value
    // And add a default row to the manual transaction list, if list is empty
    if (manualTransactionsList.value.length === 0) {
      addManualTransactionRow()
    }
  }

  async function addManualTransactions () {
    let error = false
    if (isValid()) {
      for (const transactions of manualTransactionsList.value) {
        try {
          await saveManualTransactions(transactions)
        } catch (err) {
          // TODO error handling
          error = true
          // eslint-disable-next-line no-console
          console.log('error', err)
          // breaking loop if any transaction failed
          // TODO if transaction failed, need to reset filed or not?
          break
        }
      }
      const currentRoutingSlipId = routingSlip.value?.number || ''
      await getRoutingSlip(currentRoutingSlipId)

      // not reseting if any error
      if (!error) {
        resetManualTransaction()
      }
    }
    error = false
  }

  function resetManualTransaction () {
    // change to function if needed
    showAddManualTransaction.value = !showAddManualTransaction.value
    manualTransactionsList.value = []
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
  async function updateManualTransactionDetails (
    transaction: ManualTransactionDetails,
    index: number
  ) {
    manualTransactionsList.value[index] = { ...transaction }
  }

  return {
    formRoutingSlipManualTransactions,
    showAddManualTransaction,
    manualTransactionsList,
    showManualTransaction,
    addManualTransactionRow,
    addManualTransactions,
    isLastChild,
    isValid,
    removeManualTransactionRow,
    updateManualTransactionDetails
  }
}
