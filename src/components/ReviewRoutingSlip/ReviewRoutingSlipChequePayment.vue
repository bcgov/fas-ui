<template>
  <div class="parent-container">
    <v-row class="d-flex justify-between" v-for="(payment, i) in chequePayment" :key="i">
      <v-col cols="4" class="py-0">
        <v-text-field
        filled
        readonly
        label="Receipt Number"
        persistent-hint
        :value="payment.chequeReceiptNumber"
        :data-test="getIndexedTag('txtChequeReceiptNumber', i)"
        >
        </v-text-field>
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field
        filled
        readonly
        label="Cheque Date"
        persistent-hint
        :value="payment.paymentDate ? formatDisplayDate(payment.paymentDate, 'MMMM DD, YYYY') : '-'"
        :data-test="getIndexedTag('txtChequeDate', i)"
        >
        </v-text-field>
      </v-col>
      <v-col cols="4" class="py-0">
        <v-text-field
        filled
        readonly
        label="Amount ($)"
        persistent-hint
        :value="payment.paidAmount"
        type="number"
        :data-test="getIndexedTag('txtPaidAmount', i)"
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

@Component({})
export default class ReviewRoutingSlipChequePayment extends Vue {
  @Prop({ default: null }) chequePayment: Payment[]
  public formatDisplayDate = commonUtil.formatDisplayDate

  public getIndexedTag (tag, index): string {
    return `${tag}-${index}`
  }
}
</script>
<style lang="scss" scoped>
  .textNumber input[type='number'] {
    -moz-appearance:textfield;
  }
  .textNumber input::-webkit-outer-spin-button,
  .textNumber input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
