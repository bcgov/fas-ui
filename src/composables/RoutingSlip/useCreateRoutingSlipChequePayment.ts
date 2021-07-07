import { onMounted, reactive, ref } from '@vue/composition-api'

import { Cheque } from '@/models/cheque'

// Composable function to inject Props, options and values to CreateRoutingSlipDetails component
export function useCreateRoutingSlipChequePayment () {
  const totalAmount = ref(null)
  const chequeList = reactive<Cheque[]>([])

  function getIndexedTag (tag: string, index: number): string {
    return `${tag}-${index}`
  }

  function removeCheque (index: number) {
    chequeList.splice(index, 1)
  }

  function getDefaultRow (): Cheque {
    return { chequeNumber: null, chequeAmount: null, chequeDate: '' }
  }

  function addCheque () {
    chequeList.push(getDefaultRow())
  }

  // By default, we have one cheque row in UI
  onMounted(() => {
    addCheque()
  })

  return {
    totalAmount,
    chequeList,
    onMounted,
    getDefaultRow,
    getIndexedTag,
    addCheque,
    removeCheque
  }
}
