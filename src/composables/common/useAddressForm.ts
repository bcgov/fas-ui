import { Address, BaseAddressModel } from '@/models/Address'
import { onMounted, ref, toRefs } from '@vue/composition-api'

import CommonUtils from '@/util/common-util'

/*
Composable function for Address component that is displayed at view routing slip refund request flow
*/
export function useAddressForm (props, context) {
  // using `toRefs` to create a Reactive Reference to the `user` property of props
  const { address } = toRefs(props)
  const inputaddress = ref<BaseAddressModel>({} as BaseAddressModel)

  onMounted(() => {
    if (address.value) {
      // convert to address format to component
      inputaddress.value = CommonUtils.convertAddressForComponent(address.value)
      emitUpdateAddress(inputaddress.value)
    }
  })

  function emitUpdateAddress (iaddress: BaseAddressModel): void {
    // convert back to Address
    const address = CommonUtils.convertAddressForAuth(iaddress)
    context.emit('update:address', address)
  }

  function emitAddressValidity (isValid: boolean): void {
    context.emit('valid', isValid)
  }

  return {
    inputaddress,
    emitUpdateAddress,
    emitAddressValidity
  }
}
