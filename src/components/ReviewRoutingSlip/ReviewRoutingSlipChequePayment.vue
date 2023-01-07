<template>
  <div class="parent-container">
    <v-row class="d-flex justify-between" v-for="(payment, i) in chequePayment" :key="i">
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
        filled
        :disabled="!isEditable || isALinkedChild"
        label="Cheque Number"
        persistent-hint
        hide-details
        :value="payment.chequeReceiptNumber"
        :data-test="getIndexedTag('txt-cheque-receipt-number', i)"
        @input="e => adjustRoutingSlipChequeNumber(e, i)"
        >
        </v-text-field>
      </v-col>
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
        filled
        disabled
        label="Cheque Date"
        persistent-hint
        hide-details
        :value="payment.paymentDate ? formatDisplayDate(payment.paymentDate.split('T')[0], 'MMMM DD, YYYY') : '-'"
        :data-test="getIndexedTag('txt-cheque-date', i)"
        >
        </v-text-field>
      </v-col>
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
        filled
        :disabled="!isEditable || isALinkedChild"
        label="Amount(CAD$)"
        persistent-hint
        hide-details
        :value="Number(payment.paidAmount).toFixed(2)"
        type="number"
        :data-test="getIndexedTag('txt-paid-amount', i)"
        @input="e => adjustRoutingSlipAmount(e, i)"
        >
        </v-text-field>
      </v-col>
      <v-col cols="3" v-if="isAmountPaidInUsd">
        <v-text-field
        filled
        :disabled="isEditable || isALinkedChild"
        label="Amount(USD$)"
        persistent-hint
        hide-details
        :value="Number(payment.paidUsdAmount).toFixed(2)"
        type="number"
        :data-test="getIndexedTag('txt-paid-amount', i)"
        @input="e => adjustRoutingSlipChequeAmount(e, i)"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Payment } from '@/models/Payment'
import commonUtil from '@/util/common-util'
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
export default class ReviewRoutingSlipChequePayment extends Vue {
  @Prop({ default: null }) chequePayment: Payment[]
  @Prop({ default: false }) isAmountPaidInUsd: boolean
  @Prop({ default: false }) isEditable: boolean
  @Prop({ default: false }) isALinkedChild: boolean
  public formatDisplayDate = commonUtil.formatDisplayDate

  public getIndexedTag (tag, index): string {
    return `${tag}-${index}`
  }
}
</script>
