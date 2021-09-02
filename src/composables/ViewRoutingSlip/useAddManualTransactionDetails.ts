import { computed, ref, toRefs } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { ManualTransactionDetails } from '@/models/RoutingSlip'

// Composable function to inject Props, options and values to AddManualTransactionDetails component
export default function useAddManualTransactionDetails (props, context) {
  const { value, index } = toRefs(props)

  // using same v-model value for getting value and update parent on change
  const manualTransactionDetail = computed({
    get: () => {
      return value.value
    },
    set: (modalValue: ManualTransactionDetails[]) => {
      context.emit('input', modalValue)
    }
  })

  // Input field rules
  const requiredFieldRule = CommonUtils.requiredFieldRule()

  // we emit this remove row event, that is consumed in parent and slice the v-model array of parent
  function removeManualTransactionRowEventHandler () {
    context.emit('removeManualTransactionRow', index)
  }

  return {
    manualTransactionDetail,
    requiredFieldRule,
    removeManualTransactionRowEventHandler
  }
}
