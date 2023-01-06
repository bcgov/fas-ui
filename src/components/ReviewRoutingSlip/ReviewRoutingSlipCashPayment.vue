<template>
  <v-row class="d-flex justify-between" v-if="cashPayment">
    <v-col :cols="isAmountPaidInUsd ? 4: 6">
      <v-text-field
      filled
      :disabled="!isEditable"
      label="Receipt Number"
      persistent-hint
      hide-details
      :value="cashPayment.chequeReceiptNumber"
      data-test="txt-receipt-number"
      v-model="cashPayment.chequeReceiptNumber"
      >
      </v-text-field>
    </v-col>
    <v-col :cols="isAmountPaidInUsd > 0 ? 4: 6">
      <v-text-field
      filled
      :disabled="!isEditable"
      label="Amount(CAD$)"
      persistent-hint
      hide-details
      :value="cashPayment.paidAmount.toFixed(2)"
      type="number"
      data-test="txt-paid-amount"
      >
      </v-text-field>
    </v-col>
    <v-col cols="4" v-if="isAmountPaidInUsd">
      <v-text-field
      filled
      :disabled="!isEditable"
      label="Amount(USD$)"
      persistent-hint
      hide-details
      :value="cashPayment.paidUsdAmount.toFixed(2)"
      type="number"
      data-test="txt-paid-amount"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Payment } from '@/models/Payment'

@Component({})
export default class ReviewRoutingSlipCashPayment extends Vue {
  @Prop({ default: null }) cashPayment: Payment
  @Prop({ default: false }) isAmountPaidInUsd: boolean
  @Prop({ default: false }) isEditable: boolean
}
</script>
