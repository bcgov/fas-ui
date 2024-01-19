<template>
  <div class="parent-container">
    <v-row
      v-for="(payment, i) in chequePayment"
      :key="i"
      class="d-flex justify-between"
    >
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
          variant="filled"
          :disabled="!isEditable || isALinkedChild"
          label="Cheque Number"
          persistent-hint
          hide-details
          :model-value="payment.chequeReceiptNumber"
          :data-test="getIndexedTag('txt-cheque-receipt-number', i)"
          @update:model-value="e => adjustRoutingSlipChequeNumber(e, i)"
        />
      </v-col>
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
          variant="filled"
          disabled
          label="Cheque Date"
          persistent-hint
          hide-details
          :model-value="payment.paymentDate ? formatDisplayDate(payment.paymentDate.split('T')[0], 'DDD') : '-'"
          :data-test="getIndexedTag('txt-cheque-date', i)"
        />
      </v-col>
      <v-col :cols="isAmountPaidInUsd ? 3 : 4">
        <v-text-field
          variant="filled"
          :disabled="!isEditable || isALinkedChild"
          label="Amount(CAD$)"
          persistent-hint
          hide-details
          :model-value="payment.paidAmount"
          type="number"
          :data-test="getIndexedTag('txt-paid-amount', i)"
          @update:model-value="e => adjustRoutingSlipAmount(e, false, i)"
        />
      </v-col>
      <v-col
        v-if="isAmountPaidInUsd"
        cols="3"
      >
        <v-text-field
          variant="filled"
          :disabled="!isEditable || isALinkedChild"
          label="Amount(USD$)"
          persistent-hint
          hide-details
          :model-value="payment.paidUsdAmount"
          type="number"
          :data-test="getIndexedTag('txt-paid-amount', i)"
          @update:model-value="e => adjustRoutingSlipAmount(e, true, i)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { Payment } from '@/models/Payment'
import { defineProps } from 'vue'
import { formatDisplayDate } from '@/util'
import { usePaymentInformation } from '@/composables/ViewRoutingSlip'

defineProps<{
  chequePayment: Payment[],
  isAmountPaidInUsd: number,
  isEditable: boolean,
  isALinkedChild?: boolean
}>()

const { adjustRoutingSlipChequeNumber, adjustRoutingSlipAmount } = usePaymentInformation()
const getIndexedTag = (tag, index) => `${tag}-${index}`
</script>
