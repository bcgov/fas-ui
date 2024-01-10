<template>
  <div>
    <header class="d-flex flex-column mb-0">
      <div>
        <h3 data-test="title">
          Payment Information
        </h3>
        <p>
          {{ $t('paymentInformationSubText') }}
        </p>
      </div>
    </header>
    <v-card class="pl-5 py-2 mt-5 pr-5">
      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-12 col-sm-12 ">
            <v-row no-gutters>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Total Amount Received
              </v-col>
              <v-col
                v-if="routingSlip"
                class="col-6 col-sm-9 status-list"
                data-test="total"
              >
                {{ totalAmount }}
                <span v-if="isRoutingSlipPaidInUsd || isRoutingSlipChildPaidInUsd">(Funds converted USD to CAD)</span>
              </v-col>
            </v-row>
            <v-row
              v-if="routingSlip"
              no-gutters
              class="mb-2"
            >
              <v-col class="col-6 col-sm-3 font-weight-bold">
                <v-btn
                  variant="text"
                  data-test="btn-view-payment-information"
                  class="px-0"
                  color="primary"
                  @click="viewPaymentInformation"
                >
                  <span class="font-weight-bold">View payment information</span>
                  <v-icon
                    size="small"
                    color="primary"
                  >
                    {{
                      isExpanded ? 'mdi-menu-up' : 'mdi-menu-down'
                    }}
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col
                v-if="displayEditRoutingSlip"
                v-can:fas_correction.hide
                class="d-flex justify-end"
              >
                <v-btn
                  variant="text"
                  class="px-0 text-primary cursor-pointer"
                  color="primary"
                  :disabled="!enableEditRoutingSlip"
                  @click="editPayment"
                >
                  <v-icon
                    color="primary"
                    size="14"
                  >
                    mdi-pencil
                  </v-icon>
                  <span>Edit Routing Slip</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row
              v-if="isExpanded && routingSlip && routingSlip.payments"
              no-gutters
              class="mb-10"
            >
              <v-expand-transition>
                <v-col cols="11">
                  <review-routing-slip-cheque-payment
                    v-if="isPaymentCheque"
                    data-test="review-routing-slip-cheque-payment"
                    :chequePayment="routingSlip.payments"
                    :isAmountPaidInUsd="isRoutingSlipPaidInUsd"
                    :isEditable="isEditable"
                  />
                  <review-routing-slip-cash-payment
                    v-else
                    data-test="review-routing-slip-cash-payment"
                    :cashPayment="routingSlip.payments[0]"
                    :isAmountPaidInUsd="isRoutingSlipPaidInUsd"
                    :isEditable="isEditable"
                  />
                  <div
                    v-if="isRoutingSlipLinked && !isRoutingSlipAChild && linkedRoutingSlips.children"
                    class="d-flex flex-column"
                  >
                    <div
                      v-for="(child, i) in linkedRoutingSlips.children"
                      :key="i"
                      class="d-flex flex-column"
                    >
                      <div class="d-flex mt-6 mb-3">
                        <p class="ma-0">
                          Linked with:
                        </p>
                        <router-link :to="navigateTo(routingSlip.number, child.number)">
                          <span
                            :data-test="getIndexedTag('text-review-routing-slip', i)"
                            class="font-weight-bold pl-1"
                          >{{ child.number }}</span>
                        </router-link>
                      </div>
                      <review-routing-slip-cheque-payment
                        v-if="child.payments[0].paymentMethod === PaymentMethods.CHEQUE"
                        :data-test="getIndexedTag('cheque-child-payment', i)"
                        :chequePayment="child.payments"
                        :isAmountPaidInUsd="child.payments[0].paidUsdAmount && child.payments[0].paidUsdAmount>0"
                        :isEditable="isEditable"
                        :isALinkedChild="true"
                      />
                      <review-routing-slip-cash-payment
                        v-else
                        :data-test="getIndexedTag('cash-child-payment', i)"
                        :cashPayment="child.payments[0]"
                        :isAmountPaidInUsd="child.payments[0].paidUsdAmount && child.payments[0].paidUsdAmount>0"
                        :isEditable="isEditable"
                        :isALinkedChild="true"
                      />
                    </div>
                  </div>
                </v-col>
              </v-expand-transition>
              <v-col
                v-if="isEditable"
                class="d-flex justify-end mt-6"
              >
                <v-btn
                  size="large"
                  :disabled="!hasPaymentChanges"
                  color="primary"
                  class="px-10"
                  data-test="btn-save-edit-transaction"
                  @click="adjustRoutingSlipHandler"
                >
                  <span>Save</span>
                </v-btn>
                <v-btn
                  size="large"
                  variant="outlined"
                  color="primary"
                  class="ml-3"
                  data-test="btn-cancel"
                  @click="cancelEditPayment"
                >
                  <span>Cancel</span>
                </v-btn>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Current Balance
              </v-col>
              <v-col
                v-if="routingSlip"
                class="col-6 col-sm-9 font-weight-bold"
                data-test="remaining-amount"
              >
                {{ remainingAmount }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import { usePaymentInformation } from '@/composables/ViewRoutingSlip'
import ReviewRoutingSlipCashPayment from '@/components/ReviewRoutingSlip/ReviewRoutingSlipCashPayment.vue'
import ReviewRoutingSlipChequePayment from '@/components/ReviewRoutingSlip/ReviewRoutingSlipChequePayment.vue'
import { can as vCan } from '@/directives/can'
import { PaymentMethods } from '@/util/constants'

const {
  routingSlip,
  isExpanded,
  isEditable,
  isPaymentCheque,
  linkedRoutingSlips,
  isRoutingSlipAChild,
  isRoutingSlipLinked,
  totalAmount,
  remainingAmount,
  isRoutingSlipPaidInUsd,
  isRoutingSlipChildPaidInUsd,
  displayEditRoutingSlip,
  enableEditRoutingSlip,
  adjustRoutingSlipHandler,
  editPayment,
  cancelEditPayment,
  viewPaymentInformation,
  navigateTo,
  hasPaymentChanges
} = usePaymentInformation()

const getIndexedTag = (tag, index): string => {
  return `${tag}-${index}`
}
</script>
<style lang="scss">
.pay-info .col {
  padding-left: 0px;
}
</style>
