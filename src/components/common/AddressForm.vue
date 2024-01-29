<template>
  <BaseAddress
    ref="baseAddress"
    :editing="editing"
    :schema="schema"
    :value="address"
    @update-address="emitUpdateAddress"
    @valid="emitAddressValidity"
  />
</template>

<script setup lang="ts">
import 'sbc-common-components/public/css/addresscomplete-2.30.min.css'
import 'sbc-common-components/public/js/addresscomplete-2.30.min.js'
import { ref, toRef } from 'vue'
import { AddressIF } from '@bcrs-shared-components/interfaces'
import BaseAddress from '@bcrs-shared-components/base-address/BaseAddress.vue'

const props = withDefaults(defineProps<{
  editing: boolean
  address: AddressIF
  schema: any
}>(), {
  editing: true,
  address: null,
  schema: {}
})

const emits = defineEmits<{
  'update-address': [address: AddressIF]
  valid: [valid: boolean]
}>()

const {
  address,
  baseAddress,
  emitUpdateAddress,
  emitAddressValidity,
  triggerValidate
} = useAddressForm(props, emits)

function useAddressForm (props, emits) {
  const { address } = toRef(props.address)
  const baseAddress = ref<HTMLFormElement>()

  function emitUpdateAddress (address: AddressIF): void {
    emits('update-address', address)
  }

  function emitAddressValidity (isValid: boolean): void {
    emits('valid', isValid)
  }

  function triggerValidate (): boolean {
    // validate form fields and show error message for address component from sbc-common-component
    return baseAddress.value?.$refs?.addressForm.validate()
  }

  return {
    address,
    baseAddress,
    emitUpdateAddress,
    emitAddressValidity,
    triggerValidate
  }
}

defineExpose({
  triggerValidate
})
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

:deep(.v-input) {
  margin-bottom: 16px;
}
</style>
