import { ref, watch } from '@vue/composition-api'

import { Invoice } from '@/models/Invoice'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useState } = routingSlipModule

// Composable function to inject Props, options and values to RoutingSlipTransaction component
export default function useRoutingSlipTransaction (_, context) {
  // vuex state
  const { routingSlip } = useState(['routingSlip'])
  const invoices = ref<Invoice[]>([])

  // We are watching routingslip parent object and if any changes, we update the invoice state and pass it along to transaction table to display
  watch(routingSlip, () => {
    invoices.value = routingSlip.value?.invoices
  }, { immediate: true, deep: true })

  function close (): void {
    context.root.$router.push('home')
  }

  return {
    invoices,
    close
  }
}
