import { nextTick, ref, toRefs, watch } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { GetFeeRequestParams } from '@/models/Payment'
import { ManualTransactionDetails } from '@/models/RoutingSlip'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions } = routingSlipModule

// Composable function to inject Props, options and values to AddManualTransactionDetails component
export default function useAddManualTransactionDetails (props, context) {
  const { manualTransaction, index } = toRefs(props)

  // prop that holds the input fields
  const manualTransactionDetails = ref<ManualTransactionDetails>(JSON.parse(JSON.stringify(manualTransaction.value)))

  // vuex action and state
  const { getFeeByCorpTypeAndFilingType } = useActions([
    'getFeeByCorpTypeAndFilingType'
  ])

  // update total if its updated dependecies are not null
  watch(manualTransactionDetails, async (manualTransaction: ManualTransactionDetails) => {
    if (manualTransaction && manualTransaction.filingType && manualTransaction.quantity) {
      // get new total from Pay-api services
      const getFeeRequestParams: GetFeeRequestParams = {
        corpTypeCode: manualTransaction.filingType.corpTypeCode.code,
        filingTypeCode: manualTransaction.filingType.filingTypeCode.code,
        requestParams: {
          quantity: manualTransaction.quantity,
          priority: manualTransaction.priority,
          futureFiling: manualTransaction.futureFiling
        }
      }
      manualTransactionDetails.value.total = await getFeeByCorpTypeAndFilingType(getFeeRequestParams)
    } else {
      manualTransactionDetails.value.total = null
    }
    await nextTick()
    context.emit('updateManualTransaction', manualTransactionDetails, index)
  }, { deep: true })

  // Input field rules
  const requiredFieldRule = CommonUtils.requiredFieldRule()

  // we emit this remove row event, that is consumed in parent and slice the v-model array of parent
  function removeManualTransactionRowEventHandler () {
    context.emit('removeManualTransactionRow', index)
  }

  return {
    manualTransactionDetails,
    requiredFieldRule,
    removeManualTransactionRowEventHandler
  }
}
