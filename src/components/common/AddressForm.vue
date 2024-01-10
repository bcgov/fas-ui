<template>
  <!-- <base-address
    ref="baseAddress"
    :editing="editing"
    :schema="schema"
    :address="inputaddress"
    @update:address="emitUpdateAddress"
    @valid="emitAddressValidity"
  /> -->
  <div>address</div>
</template>

<script setup lang="ts">
import 'sbc-common-components/public/css/addresscomplete-2.30.min.css'
import 'sbc-common-components/public/js/addresscomplete-2.30.min.js'
import { Address } from '@/models/Address'
import { useAddressForm } from '@/composables/common'
// TODO put base address back.
// import BaseAddress from '@bcrs-shared-components/base-address/BaseAddress.vue'

const props = defineProps<{
  editing: boolean
  address: Address
  schema: any
}>()

const emits = defineEmits<{
  'update:address': [address: Address]
  valid: [valid: boolean]
}>()

// TODO use these.
const {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  inputaddress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  baseAddress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitUpdateAddress,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  emitAddressValidity,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  triggerValidate
} = useAddressForm(props, emits)
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
</style>
