<template>
  <v-form ref="refundRequestForm">
    <v-text-field
    filled
    label="Name of Person or Organization"
    persistent-hint
    v-model.trim="name"
    data-test="txtName"
    :rules="nameRules"
    >
    </v-text-field>
    <address-form
      ref="baseAddress"
      :editing="isEditing"
      :schema="baseAddressSchema"
      :address="inputaddress"
      @update:address="address=$event"
      @valid="addressValidity"
    >
    </address-form>
  </v-form>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useRefundRequestForm } from '@/composables/ViewRoutingSlip'
import AddressForm from '@/components/common/AddressForm.vue'
import { RefundRequestDetails } from '@/models/RoutingSlip'

@Component({
  components: {
    AddressForm
  },
  setup (props, context) {
    const {
      baseAddressSchema,
      refundRequestForm,
      inputaddress,
      nameRules,
      name,
      address,
      addressValidity
    } = useRefundRequestForm(props, context)

    return {
      baseAddressSchema,
      refundRequestForm,
      inputaddress,
      nameRules,
      name,
      address,
      addressValidity
    }
  }
})
export default class RefundRequestForm extends Vue {
  @Prop({ default: () => null }) inputRefundRequestDetails: RefundRequestDetails
  @Prop({ default: () => false }) isEditing: boolean
}
</script>
