<template>
  <v-row class="mb-3">
    <v-col class="col-3 font-weight-bold">
      Payment Information
    </v-col>
    <v-col class="col-9" data-test="payment-info">
      {{ isPaymentMethodCheque ? "Cheque" : "Cash" }}
    </v-col>
  <v-col cols="10">
    <!--- cheque children if payment is cheque, else cash child --->
    <review-routing-slip-cheque-payment data-test="review-routing-slip-cheque-payment" v-if="isPaymentMethodCheque" :chequePayment="chequePayment" :isAmountPaidInUsd="isAmountPaidInUsd"/>
    <review-routing-slip-cash-payment data-test="review-routing-slip-cash-payment" v-else :cashPayment="cashPayment" :isAmountPaidInUsd="isAmountPaidInUsd"/>
  </v-col>
  <template v-if="isPaymentMethodCheque">
    <v-col class="col-3 font-weight-bold">
      Total Amount
    </v-col>
    <v-col class="col-9" data-test="total">
      {{ appendCurrencySymbol(totalAmount.toFixed(2)) }}
    </v-col>
  </template>
  </v-row>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-facing-decorator'
import { Payment } from '@/models/Payment'
import ReviewRoutingSlipCashPayment from './ReviewRoutingSlipCashPayment.vue'
import ReviewRoutingSlipChequePayment from './ReviewRoutingSlipChequePayment.vue'
import commonUtil from '@/util/common-util'

@Component({
  components: {
    ReviewRoutingSlipCashPayment,
    ReviewRoutingSlipChequePayment
  }
})
export default class ReviewRoutingSlipPayment extends Vue {
  @Prop({ default: undefined }) isPaymentMethodCheque: boolean
  @Prop({ default: () => null }) cashPayment: Payment
  @Prop({ default: () => null }) chequePayment: Payment[]
  @Prop({ default: undefined }) isAmountPaidInUsd: boolean

  public appendCurrencySymbol = commonUtil.appendCurrencySymbol

  get totalAmount (): number {
    return this.isPaymentMethodCheque ? this.chequePayment.reduce((acc, payment: Payment) => {
      return acc + payment.paidAmount
    }, 0) : null
  }
}
</script>
