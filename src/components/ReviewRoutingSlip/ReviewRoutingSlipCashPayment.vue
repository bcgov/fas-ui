<template>
  <v-row class="d-flex justify-between" v-if="cashPayment">
    <v-col cols="6" class="py-0">
      <v-text-field
      filled
      readonly
      label="Receipt Number"
      persistent-hint
      :value="cashPayment.chequeReceiptNumber"
      data-test="txtReceiptNumber"
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
      data-test="txtPaidAmount"
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
