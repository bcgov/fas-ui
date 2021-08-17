<template>
  <v-row class="d-flex justify-between" v-if="cashPayment">
    <v-col cols="6" class="py-0">
      <v-text-field
      filled
      readonly
      label="Receipt Number"
      persistent-hint
      :value="cashPayment.chequeReceiptNumber"
      data-test="txt-receipt-number"
      >
      </v-text-field>
    </v-col>
    <v-col cols="6" class="py-0">
      <v-text-field
      filled
      readonly
      label="Amount ($)"
      persistent-hint
      :value="cashPayment.paidAmount"
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
}
</script>
