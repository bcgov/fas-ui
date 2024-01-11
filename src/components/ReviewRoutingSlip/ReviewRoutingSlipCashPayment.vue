<template>
  <v-row
    v-if="cashPayment"
    class="d-flex justify-between"
  >
    <v-col :cols="isAmountPaidInUsd ? 4: 6">
      <v-text-field
        variant="filled"
        disabled
        label="Receipt Number"
        persistent-hint
        hide-details
        :model-value="cashPayment.chequeReceiptNumber"
        data-test="txt-receipt-number"
      />
    </v-col>
    <v-col :cols="isAmountPaidInUsd > 0 ? 4: 6">
      <v-text-field
        variant="filled"
        :disabled="!isEditable || isALinkedChild"
        label="Amount(CAD$)"
        persistent-hint
        hide-details
        :model-value="cashPayment.paidAmount"
        type="number"
        data-test="txt-paid-amount"
        @update:model-value="e => adjustRoutingSlipAmount(e, false)"
      />
    </v-col>
    <v-col
      v-if="isAmountPaidInUsd"
      cols="4"
    >
      <v-text-field
        variant="filled"
        :disabled="!isEditable || isALinkedChild"
        label="Amount(USD$)"
        persistent-hint
        hide-details
        :model-value="cashPayment.paidUsdAmount"
        type="number"
        data-test="txt-paid-amount"
        @update:model-value="e => adjustRoutingSlipAmount(e, true)"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Payment } from '@/models/Payment'
import { usePaymentInformation } from '@/composables/ViewRoutingSlip'

defineProps<{
  cashPayment: Payment,
  isAmountPaidInUsd: boolean,
  isEditable: boolean,
  isALinkedChild?: boolean
}>()

const {
  adjustRoutingSlipAmount
} = usePaymentInformation()
</script>
