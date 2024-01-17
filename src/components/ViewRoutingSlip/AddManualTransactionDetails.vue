<template>
  <v-row
    v-if="manualTransactionDetails"
    dense
    class="mr-8"
  >
    <v-col
      cols="12"
      class="pb-0"
    >
      <!-- calling @input rather than @keyup because @keyup used by the compoennt already !-->
      <filing-type-auto-complete
        v-model="manualTransactionDetails.filingType"
        required
        :rules="requiredFieldRule"
        @input="delayedCalculateTotal()"
      />
    </v-col>
    <v-col
      cols="2"
      class="pb-0"
    >
      <v-text-field
        v-model="manualTransactionDetails.quantity"
        variant="filled"
        label="Quantity"
        persistent-hint
        :data-test="getIndexedTag('txt-quantity', index)"
        required
        :rules="quantityRules"
        type="number"
        @update:model-value="delayedCalculateTotal()"
      />
    </v-col>
    <v-col
      cols="5"
      class="pb-0"
    >
      <v-text-field
        v-model.trim="manualTransactionDetails.referenceNumber"
        variant="filled"
        label="Incorporation/Reference Number (optional)"
        persistent-hint
        :rules="referenceNumberRules"
        :data-test="getIndexedTag('txt-incorporation', index)"
        @update:model-value="emitManualTransactionDetails()"
      />
    </v-col>
    <v-col
      :key="manualTransactionDetails.total"
      cols="5"
      class="amount pb-0"
    >
      <v-text-field
        :key="manualTransactionDetails.availableAmountForManualTransaction"
        v-model="totalFormatted"
        variant="filled"
        :error-messages="errorMessage"
        readonly
        label="$ Amount"
        persistent-hint
        :data-test="getIndexedTag('txt-amount', index)"
      />
      <div class="close-icon">
        <v-btn
          v-if="index > 0"
          icon="mdi-close"
          class="mt-3 ml-1"
          variant="text"
          size="small"
          :data-test="getIndexedTag('btn-remove', index)"
          @click="removeManualTransactionRowEventHandler(index)"
        />
      </div>
    </v-col>
    <v-col
      cols="2"
      class="pt-0"
    >
      <v-checkbox
        v-model="manualTransactionDetails.priority"
        class="ma-0"
        label="Priority Fee"
        hide-details
        :data-test="getIndexedTag('check-priority', index)"
        @update:model-value="calculateTotal()"
      />
    </v-col>
    <v-col
      cols="10"
      class="pt-0"
    >
      <v-checkbox
        v-model="manualTransactionDetails.futureEffective"
        class="ma-0"
        label="Future Effective Filing Fee"
        hide-details
        :data-test="getIndexedTag('check-future-effective', index)"
        @update:model-value="calculateTotal()"
      />
    </v-col>
    <v-col
      v-if="manualTransactionDetails.quantity > 1"
      cols="12"
    >
      <p class="mb-0">
        <v-icon>mdi-information-outline</v-icon>
        <span class="pl-1 text-color">{{ $t('addManualTransactionQuantityInfoText') }}</span>
      </p>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import FilingTypeAutoComplete from '@/components/ViewRoutingSlip/FilingTypeAutoComplete.vue'
import { ManualTransactionDetails } from '@/models/RoutingSlip'
import { useAddManualTransactionDetails } from '@/composables/ViewRoutingSlip'

const props = defineProps<{
  index: number
  manualTransaction: ManualTransactionDetails
}>()

const emits = defineEmits<{
  removeManualTransactionRow: [index: number]
  updateManualTransaction: [index: number, manualTransactionDetails: ManualTransactionDetails]
}>()

const {
  manualTransactionDetails,
  requiredFieldRule,
  removeManualTransactionRowEventHandler,
  calculateTotal,
  delayedCalculateTotal,
  getIndexedTag,
  emitManualTransactionDetails,
  errorMessage,
  totalFormatted,
  referenceNumberRules,
  quantityRules
} = useAddManualTransactionDetails(props, emits)
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
  .amount {
    position: relative;
    .close-icon {
      position: absolute;
      right: -32px;
      top: 0;
    }
  }
  .text-color {
    color: $TextColorGray;
  }
  .error-disabled {
    color: red !important;
  }
</style>
