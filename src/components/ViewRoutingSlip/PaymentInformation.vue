<template>
  <div>
    <header class="d-flex flex-column mb-0">
      <div class="d-flex justify-space-between">
        <div>
          <h3 data-test="title">02.Payment Information</h3>
          <p>
            {{ $t('paymentInformationSubText') }}
          </p>
        </div>
        <v-btn
          large
          color="primary"
          data-test="btn-add-fund"
          v-can:fas_edit.hide
        >
          <v-icon class="mr-1">mdi-plus</v-icon>
          <span>Add Additional Funds</span>
        </v-btn>
      </div>
    </header>
    <v-card class="pl-5 py-2">
      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-12 col-sm-10 ">
            <v-row no-gutters>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Total Amount Received
              </v-col>
              <v-col v-if="routingSlip" class="col-6 col-sm-9 status-list" data-test="total">
                ${{ routingSlip.total && routingSlip.total.toFixed(2) }}
              </v-col>
            </v-row>
            <v-row no-gutters v-if="routingSlip">
              <v-col class="col-6 col-sm-3 font-weight-bold">
                <v-btn
                  text
                  data-test="btn-view-payment-information"
                  class="px-0"
                  color="primary"
                  @click="viewPaymentInformation"
                >
                  <span class="font-weight-bold">{{
                    isPaymentCheque
                      ? 'View Cheque Information'
                      : 'View Cash Information'
                  }}</span>
                  <v-icon dense color="primary">{{
                    isExpanded ? 'mdi-menu-up' : 'mdi-menu-down'
                  }}</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters v-if="isExpanded">
              <v-col class="col-11 pay-info mt-4 ml-4" v-if="routingSlip && routingSlip.payments">
                <v-expand-transition>
                  <div>
                    <review-routing-slip-cheque-payment data-test="review-routing-slip-cheque-payment" v-if="isPaymentCheque" :chequePayment="routingSlip.payments"/>
                    <review-routing-slip-cash-payment data-test="review-routing-slip-cash-payment" v-else :cashPayment="routingSlip.payments[0]"/>
                    <payment-linked-routing-slips/>
                  </div>
                </v-expand-transition>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Current Balance
              </v-col>
              <v-col
                class="col-6 col-sm-9 font-weight-bold"
                data-test="remaining-amount"
                v-if="routingSlip"
              >
                ${{ routingSlip.remainingAmount && routingSlip.remainingAmount.toFixed(2) }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { usePaymentInformation } from '@/composables/ViewRoutingSlip'
import LinkedRoutingSlipsPaymentInfo from './LinkedRoutingSlipsPaymentInfo.vue'
import ReviewRoutingSlipCashPayment from '@/components/ReviewRoutingSlip/ReviewRoutingSlipCashPayment.vue'
import ReviewRoutingSlipChequePayment from '@/components/ReviewRoutingSlip/ReviewRoutingSlipChequePayment.vue'
import can from '@/directives/can'

@Component({
  components: {
    LinkedRoutingSlipsPaymentInfo,
    ReviewRoutingSlipCashPayment,
    ReviewRoutingSlipChequePayment
  },
  directives: {
    can
  },
  setup () {
    const {
      routingSlip,
      isExpanded,
      isPaymentCheque,
      viewPaymentInformation
    } = usePaymentInformation()
    return {
      routingSlip,
      isExpanded,
      isPaymentCheque,
      viewPaymentInformation
    }
  }
})
export default class PaymentInformation extends Vue {}
</script>
<style lang="scss">
.pay-info .col {
  padding-left: 0px;
}
</style>
