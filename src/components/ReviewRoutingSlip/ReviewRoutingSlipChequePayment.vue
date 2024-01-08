<template>
  <div class="parent-container">
    <v-row class="d-flex justify-between" v-for="(payment, i) in chequePayment" :key="i">
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
        filled
        :disabled="!isEditable || isALinkedChild"
        label="Cheque Number"
        persistent-hint
        hide-details
        :value="payment.chequeReceiptNumber"
        :data-test="getIndexedTag('txt-cheque-receipt-number', i)"
        @input="e => adjustRoutingSlipChequeNumber(e, i)"
        >
        </v-text-field>
      </v-col>
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
        filled
        disabled
        label="Cheque Date"
        persistent-hint
        hide-details
        :value="payment.paymentDate ? formatDisplayDate(payment.paymentDate.split('T')[0], 'MMMM DD, YYYY') : '-'"
        :data-test="getIndexedTag('txt-cheque-date', i)"
        >
        </v-text-field>
      </v-col>
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
        filled
        :disabled="!isEditable || isALinkedChild"
        label="Amount(CAD$)"
        persistent-hint
        hide-details
        :value="payment.paidAmount"
        type="number"
        :data-test="getIndexedTag('txt-paid-amount', i)"
        @input="e => adjustRoutingSlipAmount(e, false, i)"
        >
        </v-text-field>
      </v-col>
      <v-col cols="3" v-if="isAmountPaidInUsd">
        <v-text-field
        filled
        :disabled="!isEditable || isALinkedChild"
        label="Amount(USD$)"
        persistent-hint
        hide-details
        :value="payment.paidUsdAmount"
        type="number"
        :data-test="getIndexedTag('txt-paid-amount', i)"
        @input="e => adjustRoutingSlipAmount(e, true, i)"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { Payment } from '@/models/Payment'
import commonUtil from '@/util/common-util'
import { usePaymentInformation } from '@/composables/ViewRoutingSlip'
import { defineProps } from 'vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  chequePayment: Payment[],
  isAmountPaidInUsd: boolean,
  isEditable: boolean,
  isALinkedChild: boolean
}>()

const { adjustRoutingSlipChequeNumber, adjustRoutingSlipAmount } = usePaymentInformation()
const formatDisplayDate = commonUtil.formatDisplayDate
const getIndexedTag = (tag, index) => `${tag}-${index}`
</script>
