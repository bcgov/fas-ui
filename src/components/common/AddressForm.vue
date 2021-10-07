<template>
  <base-address
    ref="baseAddress"
    :editing="editing"
    :schema="schema"
    :address="inputaddress"
    @update:address="emitUpdateAddress"
    @valid="emitAddressValidity"
  />
</template>

<script lang="ts">
import { useAddressForm } from '@/composables/common'
import { Address } from '@/models/Address'
import BaseAddress from 'sbc-common-components/src/components/BaseAddress.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  components: {
    BaseAddress
  },
  setup (props, context) {
    const {
      inputaddress,
      emitUpdateAddress,
      emitAddressValidity
    } = useAddressForm(props, context)
    return {
      inputaddress,
      emitUpdateAddress,
      emitAddressValidity
    }
  }
})
export default class AddressForm extends Vue {
  @Prop({ default: true }) editing: boolean
  @Prop({ default: () => ({} as Address) }) address: Address
  @Prop({ default: {} }) schema: any
}
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
</style>
