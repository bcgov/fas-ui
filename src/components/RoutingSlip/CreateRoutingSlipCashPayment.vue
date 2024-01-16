<template>
  <v-form ref="createRoutingSlipCashPaymentForm">
    <v-row class="d-flex pa-0 ma-0 justify-between">
      <v-col
        :cols="getColumnWidth"
        class="py-0"
      >
        <v-text-field
          v-model.trim="chequeReceiptNumber"
          variant="filled"
          label="Receipt Number"
          persistent-hint
          data-test="txtReceiptNumber"
          :rules="receiptNumberRules"
        />
      </v-col>
      <v-col
        :cols="getColumnWidth"
        class="py-0"
      >
        <v-text-field
          v-model.number="paidAmount"
          variant="filled"
          label="Amount(CAD$)"
          persistent-hint
          type="number"
          data-test="txtPaidAmount"
          :rules="paidAmountRules"
          class="textNumber"
        />
      </v-col>
      <v-col
        v-if="isTheAmountPaidInUsd"
        cols="4"
        class="py-0"
      >
        <v-text-field
          v-model.number="paidUsdAmount"
          variant="filled"
          label="Amount(USD$)"
          persistent-hint
          type="number"
          data-test="txtPaidUsdAmount"
          :rules="paidUsdAmountRules"
          class="textNumber"
        />
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0 justify-end">
      <v-col
        cols="3"
        class="d-flex justify-end py-0"
      >
        <v-checkbox
          v-model="isTheAmountPaidInUsd"
          label="Funds received in USD"
          hide-details
          class="ma-0"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { useCreateRoutingSlipCashPayment } from '@/composables/RoutingSlip'

const {
  chequeReceiptNumber,
  paidAmount,
  paidUsdAmount,
  createRoutingSlipCashPaymentForm,
  receiptNumberRules,
  paidAmountRules,
  paidUsdAmountRules,
  isTheAmountPaidInUsd,
  getColumnWidth,
  isValid
} = useCreateRoutingSlipCashPayment()

defineExpose({
  isValid
})
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
