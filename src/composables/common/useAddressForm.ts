import { Address, BaseAddressModel } from '@/models/Address'
import { computed, onMounted, ref, toRefs } from 'vue'

import CommonUtils from '@/util/common-util'

/*
Composable function for Address component that is displayed at view routing slip refund request flow
*/
export function useAddressForm (props, context) {
  // using `toRefs` to create a Reactive Reference to the `user` property of props
  const { address } = toRefs(props)
  const baseAddress = ref<HTMLFormElement>()

  const inputaddress = computed(() => {
    const inputFormattedAddress: BaseAddressModel = CommonUtils.convertAddressForComponent(address.value)
    return inputFormattedAddress
  })

  function emitUpdateAddress (iaddress: BaseAddressModel): void {
    // convert back to Address
    const address = CommonUtils.convertAddressForAuth(iaddress)
    context.emit('update:address', address)
  }

  function emitAddressValidity (isValid: boolean): void {
    context.emit('valid', isValid)
  }

  function triggerValidate (): boolean {
    // validate form fields and show error message for address component from sbc-common-component
    return baseAddress.value?.$refs?.addressForm.validate()
  }

  return {
    inputaddress,
    baseAddress,
    emitUpdateAddress,
    emitAddressValidity,
    triggerValidate
  }
}
