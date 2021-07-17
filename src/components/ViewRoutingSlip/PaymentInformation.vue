<template>
  <div >
    <h3 data-test="title">02.Payment Information</h3>
    <div class="d-flex justify-space-between">
      <p class="ma-0 align-self-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
        porttitor sem.
      </p>
      <v-btn
      large
      color="primary"
      data-test="btn-add-fund"
      @click="addAdditionalFunds"
      >
        <v-icon class="mr-1">mdi-plus</v-icon>
        <span>Add Additional Funds</span>
      </v-btn>
    </div>
    <v-card class="d-flex flex-column mt-2 py-7 pl-7">
      <v-row no-gutters>
        <p class="pr-15 font-weight-bold mb-0">Total Amount Received</p>
        <p class="ma-0 align-self-center" data-test="total">${{routingSlip.total}}</p>
      </v-row>
      <v-row no-gutters class="mb-2">
        <v-btn
        text
        data-test="btn-view-payment-information"
        class="px-0"
        color="primary"
        @click="viewPaymentInformation"
        >
          <span class="font-weight-bold">{{ isPaymentCheque ? 'View Cheque Information' : 'View Cash Information' }}</span>
          <v-icon dense color="primary">{{ isExpanded ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
        </v-btn>
      </v-row>
      <v-row no-gutters v-if="isExpanded">
        <v-expand-transition>
          <create-routing-slip-cash-payment v-if="!isPaymentCheque" :isViewMode="true" data-test="ref-create-routing-slip-cash-payment"/>
          <create-routing-slip-cheque-payment v-if="isPaymentCheque" :isViewMode="true" data-test="ref-create-routing-slip-cheque-payment"/>
        </v-expand-transition>
      </v-row>
      <v-row no-gutters>
        <p class="pr-15 font-weight-bold mb-0">Current Balance</p>
        <p class="ma-0 align-self-center" data-test="remaining-amount">${{routingSlip.remainingAmount}}</p>
      </v-row>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { usePaymentInformation } from '@/composables/ViewRoutingSlip'
import { CreateRoutingSlipCashPayment, CreateRoutingSlipChequePayment } from '@/components/RoutingSlip'

@Component({
  components: {
    CreateRoutingSlipCashPayment,
    CreateRoutingSlipChequePayment
  },
  setup () {
    const {
      routingSlip,
      isPaymentCheque,
      isExpanded,
      addAdditionalFunds,
      viewPaymentInformation
    } = usePaymentInformation()
    return {
      routingSlip,
      isPaymentCheque,
      isExpanded,
      addAdditionalFunds,
      viewPaymentInformation
    }
  }
})
export default class PaymentInformation extends Vue {}

</script>
