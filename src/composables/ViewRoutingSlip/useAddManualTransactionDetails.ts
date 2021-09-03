import { computed, toRefs, watch } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { GetFeeRequestParams } from '@/models/Payment'
import { ManualTransactionDetails } from '@/models/RoutingSlip'
import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex-composition-helpers'

const routingSlipModule = createNamespacedHelpers('routingSlip') // specific module name
const { useActions } = routingSlipModule

// Composable function to inject Props, options and values to AddManualTransactionDetails component
export default function useAddManualTransactionDetails (props, context) {
  const { manualTransaction, index } = toRefs(props)

  // computed prop that holds the input fields
  const manualTransactionDetails = computed({
    get: () => {
      return manualTransaction.value
    },
    set: (modalValue: ManualTransactionDetails) => {
      context.emit('updateManualTransaction', modalValue)
    }
  })

  // vuex action and state
  const { getFeeByCorpTypeAndFilingType } = useActions([
    'getFeeByCorpTypeAndFilingType'
  ])

  // update total if its updated dependecies are not null
  watch(manualTransactionDetails, async (value: ManualTransactionDetails) => {
    if (value.filingType && value.quantity) {
      // get new total from Pay-api services
      const getFeeRequestParams: GetFeeRequestParams = {
        corpTypeCode: value.filingType.corpTypeCode.code,
        filingTypeCode: value.filingType.filingTypeCode.code,
        requestParams: {
          quantity: value.quantity,
          priority: value.priority,
          futureFiling: value.futureFiling
        }
      }
      value.total = await getFeeByCorpTypeAndFilingType(getFeeRequestParams)
      context.emit('updateManualTransaction', value)
    }
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
