<template>
  <v-form ref="refundRequestForm">
    <v-row>
      <v-col class="col-3 font-weight-bold pb-0">
        {{ 'Name of Person or Organization & Address' }}
      </v-col>
      <v-col class="col-9 pb-0">
        <v-text-field
        filled
        label="Name of Person or Organization"
        persistent-hint
        v-model.trim="name"
        data-test="txtName"
        :rules="nameRules"
        v-if="canEdit"
        >
        </v-text-field>
        <span v-else>{{ name }}</span>
        <AddressForm
          ref="addressForm"
          :editing="canEdit"
          :schema="baseAddressSchema"
          :address="address"
          @update:address="address=$event"
          @valid="addressValidity"
        >
        </AddressForm>
      </v-col>
      <v-col
        class="col-3 font-weight-bold"
        :class="canEdit ? 'pt-0' : ''"
        v-if="isEditing || chequeAdvice"
      >
        Cheque Advice
      </v-col>
      <v-col
        class="col-9"
        :class="canEdit ? 'pt-0' : ''">
        <v-text-field
          filled
          label="Additional Information"
          persistent-hint
          v-model.trim="chequeAdvice"
          data-test="txtChequeAdvice"
          :rules="chequeAdviceRules"
          maxLength=40
          placeholder="There is a 40 character limit. Include the entity name, entity number and what the refund is for."
          v-if="isEditing"
        >
        </v-text-field>
        <span v-else>{{ chequeAdvice }}</span>
      </v-col>
    </v-row>
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
      nameRules,
      chequeAdviceRules,
      name,
      chequeAdvice,
      address,
      addressForm,
      addressValidity,
      isValid,
      canEdit
    } = useRefundRequestForm(props, context)

    return {
      baseAddressSchema,
      refundRequestForm,
      nameRules,
      chequeAdviceRules,
      name,
      chequeAdvice,
      address,
      addressForm,
      addressValidity,
      isValid,
      canEdit
    }
  }
})
export default class RefundRequestForm extends Vue {
  @Prop({ default: () => null }) inputRefundRequestDetails: RefundRequestDetails
  @Prop({ default: () => false }) isEditing: boolean
  @Prop({ default: () => false }) isApprovalFlow: boolean
}
</script>
