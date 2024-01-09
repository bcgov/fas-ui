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
      <v-col class="col-3 font-weight-bold"
        :class="canEdit ? 'pt-0' : ''">
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
        v-if="isEditing"
        >
        </v-text-field>
        <span v-else>{{ chequeAdvice }}</span>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup lang="ts">
import { useRefundRequestForm } from '@/composables/ViewRoutingSlip'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AddressForm from '@/components/common/AddressForm.vue'
import { RefundRequestDetails } from '@/models/RoutingSlip'

const props = defineProps<{
  inputRefundRequestDetails: RefundRequestDetails
  isEditing: boolean
  isApprovalFlow: boolean
}>()

const emits = defineEmits<{
  updateRefundRequestDetails: [refundRequestDetails: RefundRequestDetails]
}>()

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
  canEdit
} = useRefundRequestForm(props, emits)
</script>
