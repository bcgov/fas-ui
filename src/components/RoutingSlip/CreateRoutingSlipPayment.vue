<template>
  <div class="d-flex justify-start">
    <v-col cols="2">
      <p class="text-center font-weight-bold mt-4">
        Payment Information
      </p>
    </v-col>
    <v-col
      cols="10"
      class="pl-0 pr-md-16"
    >
      <v-row class="d-flex pa-0 ma-0 justify-between">
        <v-radio-group
          v-model="isPaymentCheque"
          inline
          mandatory
          class="align-start mt-0 ml-2"
        >
          <v-row class="d-inline-flex">
            <v-col>
              <v-radio
                :key="true"
                label="Cheque"
                :value="true"
                data-test="radio-cheque"
              />
            </v-col>
            <v-col>
              <v-radio
                :key="false"
                label="Cash"
                :value="false"
                data-test="radio-cash"
              />
            </v-col>
          </v-row>
        </v-radio-group>
      </v-row>
      <v-expand-transition>
        <create-routing-slip-cheque-payment
          v-show="!!isPaymentCheque"
          ref="createRoutingSlipChequePaymentRef"
          data-test="create-routing-slip-cheque-payment"
        />
      </v-expand-transition>
      <v-expand-transition>
        <create-routing-slip-cash-payment
          v-show="!isPaymentCheque"
          ref="createRoutingSlipCashPaymentRef"
          data-test="create-routing-slip-cash-payment"
        />
      </v-expand-transition>
    </v-col>
  </div>
</template>

<script setup lang="ts">
import CreateRoutingSlipCashPayment from '@/components/RoutingSlip/CreateRoutingSlipCashPayment.vue'
import CreateRoutingSlipChequePayment from '@/components/RoutingSlip/CreateRoutingSlipChequePayment.vue'
import { useCreateRoutingSlipPayment } from '@/composables/RoutingSlip'

const {
  isPaymentCheque,
  createRoutingSlipChequePaymentRef,
  createRoutingSlipCashPaymentRef
} = useCreateRoutingSlipPayment()
</script>
