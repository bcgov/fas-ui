<template>
  <v-row class="mb-3">
    <v-col class="v-col-3 font-weight-bold">
      Payment Information
    </v-col>
    <v-col
      class="v-col-9"
      data-test="payment-info"
    >
      {{ isPaymentMethodCheque ? "Cheque" : "Cash" }}
    </v-col>
    <v-col cols="10">
      <!--- cheque children if payment is cheque, else cash child --->
      <review-routing-slip-cheque-payment
        v-if="isPaymentMethodCheque"
        data-test="review-routing-slip-cheque-payment"
        :chequePayment="chequePayment"
        :isAmountPaidInUsd="isAmountPaidInUsd"
      />
      <review-routing-slip-cash-payment
        v-else
        data-test="review-routing-slip-cash-payment"
        :cashPayment="cashPayment"
        :isAmountPaidInUsd="isAmountPaidInUsd"
      />
    </v-col>
    <template v-if="isPaymentMethodCheque">
      <v-col class="v-col-3 font-weight-bold">
        Total Amount
      </v-col>
      <v-col
        class="v-col-9"
        data-test="total"
      >
        {{ appendCurrencySymbol(totalAmount.toFixed(2)) }}
      </v-col>
    </template>
  </v-row>
</template>
<script setup lang="ts">
import { Payment } from '@/models/Payment'
import ReviewRoutingSlipCashPayment from './ReviewRoutingSlipCashPayment.vue'
import ReviewRoutingSlipChequePayment from './ReviewRoutingSlipChequePayment.vue'
import commonUtil from '@/util/common-util'
import { computed } from 'vue'

const props = defineProps<{
  isPaymentMethodCheque: boolean,
  cashPayment: Payment,
  chequePayment: Payment[],
  isAmountPaidInUsd: boolean
}>()

const appendCurrencySymbol = commonUtil.appendCurrencySymbol
const totalAmount = computed(() => {
  return props.isPaymentMethodCheque ? props.chequePayment.reduce((acc, payment: Payment) => {
    return acc + payment.paidAmount
  }, 0) : null
})
</script>
