<template>
  <div>
    <header class="d-flex flex-column mb-0">
      <div class="d-flex justify-space-between">
        <div>
          <h3 data-test="title">02.Payment Information</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
            porttitor sem.
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
              <v-col class="col-6 col-sm-9 status-list" data-test="total">
                ${{ routingSlip.total }}
              </v-col>
            </v-row>
            <v-row no-gutters>
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
              <v-col class="col-12 pay-info">
                <v-expand-transition>
                  <create-routing-slip-cash-payment
                    v-if="!isPaymentCheque"
                    :isViewMode="true"
                    data-test="ref-create-routing-slip-cash-payment"
                  />
                  <create-routing-slip-cheque-payment
                    v-if="isPaymentCheque"
                    :isViewMode="true"
                    data-test="ref-create-routing-slip-cheque-payment"
                  />
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
              >
                ${{ routingSlip.remainingAmount }}
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
import {
  CreateRoutingSlipCashPayment,
  CreateRoutingSlipChequePayment
} from '@/components/RoutingSlip'

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
      viewPaymentInformation
    } = usePaymentInformation()
    return {
      routingSlip,
      isPaymentCheque,
      isExpanded,
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
