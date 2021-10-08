import { Address, BaseAddressModel } from '@/models/Address'
import { computed, onMounted, ref, toRefs, watch } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'
import { RefundRequestDetails } from '@/models/RoutingSlip'
import { addressSchema } from '@/schema'

// Composable function to inject Props, options and values to RefundRequestForm component
export default function useRefundRequestForm (props, context) {
  // using `toRefs` to create a Reactive Reference to the `slipId` property of props
  const { inputRefundRequestDetails } = toRefs(props)

  const baseAddressSchema = ref<any>(addressSchema)
  const isAddressValid = ref<boolean>(false)
  const inputaddress = ref<BaseAddressModel>({} as BaseAddressModel)

  const refundRequestForm = ref<HTMLFormElement>()

  const nameRules = CommonUtils.requiredFieldRule()

  const name = ref<string>('')
  const address = ref<Address>(undefined)

  function addressValidity (isValid: boolean): void {
    isAddressValid.value = isValid
  }

  function isValid (): boolean {
    return refundRequestForm.value?.validate() && isAddressValid.value
  }

  // watch input elements name and address, and if anything changes, bubble up the values back to parent;
  watch([name, address], () => {
    const refundRequestDetails: RefundRequestDetails = { name: name.value, address: address.value } as RefundRequestDetails
    context.emit('update:refundRequestDetails', refundRequestDetails)
  })

  // watch property from parent and if there are any updates, pass on the values to address component
  watch(inputRefundRequestDetails, () => {
    if (inputRefundRequestDetails.value) {
      // convert to address format to component
      name.value = inputRefundRequestDetails.value?.name
      inputaddress.value = CommonUtils.convertAddressForComponent(inputRefundRequestDetails.value?.address)
    }
  })

  return {
    baseAddressSchema,
    refundRequestForm,
    inputaddress,
    nameRules,
    name,
    address,
    addressValidity,
    isValid
  }
}
