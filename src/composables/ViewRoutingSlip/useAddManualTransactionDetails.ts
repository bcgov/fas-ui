import { computed, onMounted, ref, toRefs } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { ManualTransactionDetails } from '@/models/RoutingSlip'

// Composable function to inject Props, options and values to AddManualTransactionDetails component
export default function useAddManualTransactionDetails (props, context) {
  const { value } = toRefs(props)
  const formManualTransactionDetails = ref<HTMLFormElement>()

  // using same v-model value for getting value and update parent on change
  const manualTransactionsList = computed({
    get: () => {
      return value.value
    },
    set: (modalValue: ManualTransactionDetails[]) => {
      context.emit('input', modalValue)
    }
  })

  // Input field rules
  const quantityRules = CommonUtils.requiredFieldRule()
  const referenceNumberRules = CommonUtils.requiredFieldRule()

  // By default, we show 1 manual transaction record
  onMounted(() => {
    if (value.value.length === 0) {
      addManualTransactionRow()
    }
  })

  function isDividerVisible (index: number): boolean {
    const length = manualTransactionsList.value.length - 1
    return index !== length
  }

  function getDefaultRow (): ManualTransactionDetails {
    // by default, the flags isFutureEffectiveFiling, isPriorityFee are false
    return { isFutureEffectiveFiling: false, isPriorityFee: false }
  }

  function addManualTransactionRow () {
    manualTransactionsList.value.push(getDefaultRow())
  }

  function isValid (): boolean {
    return formManualTransactionDetails.value.validate()
  }

  function removeManualTransactionRow (index: number) {
    manualTransactionsList.value.splice(index, 1)
  }

  return {
    manualTransactionsList,
    quantityRules,
    referenceNumberRules,
    formManualTransactionDetails,
    isDividerVisible,
    isValid,
    addManualTransactionRow,
    removeManualTransactionRow
  }
}
