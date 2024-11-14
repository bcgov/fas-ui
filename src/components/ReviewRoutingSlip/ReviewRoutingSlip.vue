<template>
  <v-container class="view-container pl-9">
    <review-routing-slip-details class="mb-10" data-test="review-routing-slip-details" :routingSlipDetails="routingSlipDetails" :accountInfo="accountInfo"/>
    <review-routing-slip-payment data-test="review-routing-slip-payment" :isPaymentMethodCheque="isPaymentMethodCheque" :cashPayment="cashPayment" :chequePayment="chequePayment" :isAmountPaidInUsd="isAmountPaidInUsd"/>
    <review-routing-slip-address data-test="review-routing-slip-payment" :routingSlipAddress="routingSlipAddress"/>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ReviewRoutingSlipDetails from './ReviewRoutingSlipDetails.vue'
import ReviewRoutingSlipPayment from './ReviewRoutingSlipPayment.vue'
import ReviewRoutingSlipAddress from './ReviewRoutingSlipAddress.vue'
import { useReviewRoutingSlip } from '@/composables/ReviewRoutingSlip'

@Component({
  components: {
    ReviewRoutingSlipDetails,
    ReviewRoutingSlipPayment,
    ReviewRoutingSlipAddress
  },
  setup () {
    const {
      routingSlipDetails,
      routingSlipAddress,
      chequePayment,
      accountInfo,
      cashPayment,
      isPaymentMethodCheque,
      isAmountPaidInUsd
    } = useReviewRoutingSlip()
    return {
      routingSlipDetails,
      routingSlipAddress,
      chequePayment,
      accountInfo,
      cashPayment,
      isPaymentMethodCheque,
      isAmountPaidInUsd
    }
  }
})
export default class ReviewRoutingSlip extends Vue {}
</script>
