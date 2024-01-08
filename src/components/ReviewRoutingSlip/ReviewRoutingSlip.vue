<template>
  <v-container class="view-container pl-9">
    <review-routing-slip-details class="mb-10" data-test="review-routing-slip-details" :routingSlipDetails="routingSlipDetails" :accountInfo="accountInfo"/>
    <review-routing-slip-payment data-test="review-routing-slip-payment" :isPaymentMethodCheque="isPaymentMethodCheque" :cashPayment="cashPayment" :chequePayment="chequePayment" :isAmountPaidInUsd="isAmountPaidInUsd"/>
  </v-container>
</template>
<script setup lang="ts">
import ReviewRoutingSlipDetails from './ReviewRoutingSlipDetails.vue'
import ReviewRoutingSlipPayment from './ReviewRoutingSlipPayment.vue'
import { useReviewRoutingSlip } from '@/composables/ReviewRoutingSlip'

const {
  routingSlipDetails,
  chequePayment,
  accountInfo,
  cashPayment,
  isPaymentMethodCheque,
  isAmountPaidInUsd
} = useReviewRoutingSlip()
</script>
