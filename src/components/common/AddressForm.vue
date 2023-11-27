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
import BaseAddress from '@bcrs-shared-components/base-address/BaseAddress.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import 'sbc-common-components/public/css/addresscomplete-2.30.min.css'
import 'sbc-common-components/public/js/addresscomplete-2.30.min.js'

@Component({
  components: {
    BaseAddress
  },
  setup (props, context) {
    const {
      inputaddress,
      baseAddress,
      emitUpdateAddress,
      emitAddressValidity,
      triggerValidate
    } = useAddressForm(props, context)
    return {
      inputaddress,
      baseAddress,
      emitUpdateAddress,
      emitAddressValidity,
      triggerValidate
    }
  }
})
export default class AddressForm extends Vue {
  @Prop({ default: false }) editing: boolean
  @Prop({ default: () => ({} as Address) }) address: Address
  @Prop({ default: {} }) schema: any
}
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
</style>
