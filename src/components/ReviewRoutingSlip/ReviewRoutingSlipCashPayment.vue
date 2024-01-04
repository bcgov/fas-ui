<template>
  <v-row class="d-flex justify-between" v-if="cashPayment">
    <v-col :cols="isAmountPaidInUsd ? 4: 6">
      <v-text-field
      filled
      disabled
      label="Receipt Number"
      persistent-hint
      hide-details
      :value="cashPayment.chequeReceiptNumber"
      data-test="txt-receipt-number"
      >
      </v-text-field>
    </v-col>
    <v-col :cols="isAmountPaidInUsd > 0 ? 4: 6">
      <v-text-field
      filled
      :disabled="!isEditable || isALinkedChild"
      label="Amount(CAD$)"
      persistent-hint
      hide-details
      :value="cashPayment.paidAmount"
      type="number"
      data-test="txt-paid-amount"
      @input="e => adjustRoutingSlipAmount(e, false)"
      >
      </v-text-field>
    </v-col>
    <v-col cols="4" v-if="isAmountPaidInUsd">
      <v-text-field
      filled
      :disabled="!isEditable || isALinkedChild"
      label="Amount(USD$)"
      persistent-hint
      hide-details
      :value="cashPayment.paidUsdAmount"
      type="number"
      data-test="txt-paid-amount"
      @input="e => adjustRoutingSlipAmount(e, true)"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import { Payment } from '@/models/Payment'
import { usePaymentInformation } from '@/composables/ViewRoutingSlip'

@Component({
  setup (_, context) {
    const {
      adjustRoutingSlipChequeNumber,
      adjustRoutingSlipAmount
    } = usePaymentInformation(_, context)
    return {
      adjustRoutingSlipChequeNumber,
      adjustRoutingSlipAmount
    }
  }
})
export default class ReviewRoutingSlipCashPayment extends Vue {
  @Prop({ default: null }) cashPayment: Payment
  @Prop({ default: false }) isAmountPaidInUsd: boolean
  @Prop({ default: false }) isEditable: boolean
  @Prop({ default: false }) isALinkedChild: boolean
}
</script>
