<template>
  <v-row dense class="mr-8" v-if="manualTransactionDetails">
    <v-col cols="12" class="pb-0">
      <!-- calling @input rather than @keyup because @keyup used by the compoennt already !-->
      <filing-type-auto-complete
        v-model="manualTransactionDetails.filingType"
        required
        :rules="requiredFieldRule"
        @input="delayedCalculateTotal()"
      />
    </v-col>
    <v-col cols="2" class="pb-0">
      <v-text-field
        filled
        label="Quantity"
        persistent-hint
        :data-test="getIndexedTag('txt-quantity', index)"
        required
        :rules="quantityRules"
        v-model="manualTransactionDetails.quantity"
        type="number"
        @input="delayedCalculateTotal()"
      >
      </v-text-field>
    </v-col>
    <v-col cols="5" class="pb-0">
      <v-text-field
        filled
        label="Incorporation/Reference Number (optional)"
        persistent-hint
        :rules="referenceNumberRules"
        :data-test="getIndexedTag('txt-incorporation', index)"
        v-model.trim="manualTransactionDetails.referenceNumber"
        @input="emitManualTransactionDetails()"
      >
      </v-text-field>
    </v-col>
    <v-col cols="5" class="amount pb-0" :key="manualTransactionDetails.total">
      <v-text-field
        filled
        :error-messages="errorMessage"
        readonly
        :key="manualTransactionDetails.availableAmountForManualTransaction"
        label="$ Amount"
        persistent-hint
        :data-test="getIndexedTag('txt-amount', index)"
        v-model="totalFormatted"
      >
      </v-text-field>
      <div class="close-icon">
        <v-btn
          icon
          class="mt-3 ml-1"
          @click="removeManualTransactionRowEventHandler(index)"
          v-if="index > 0"
          :data-test="getIndexedTag('btn-remove', index)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="2" class="pt-0">
      <v-checkbox
        class="ma-0"
        label="Priority Fee"
        v-model="manualTransactionDetails.priority"
        hide-details
        :data-test="getIndexedTag('check-priority', index)"
        @change="calculateTotal()"
      ></v-checkbox>
    </v-col>
    <v-col cols="10" class="pt-0">
      <v-checkbox
        class="ma-0"
        label="Future Effective Filing Fee"
        v-model="manualTransactionDetails.futureEffective"
        hide-details
        :data-test="getIndexedTag('check-future-effective', index)"
        @change="calculateTotal()"
      ></v-checkbox>
    </v-col>
    <v-col cols="12" v-if="manualTransactionDetails.quantity > 1">
      <p class="mb-0">
        <v-icon>mdi-information-outline</v-icon>
        <span class="pl-1 text-color">{{ $t('addManualTransactionQuantityInfoText') }}</span>
      </p>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { useAddManualTransactionDetails } from '@/composables/ViewRoutingSlip'
import { Component, Prop, Vue } from 'vue-facing-decorator'
import FilingTypeAutoComplete from '@/components/ViewRoutingSlip/FilingTypeAutoComplete.vue'
import { ManualTransactionDetails } from '@/models/RoutingSlip'

@Component({
  components: {
    FilingTypeAutoComplete
  },
  setup (props, context) {
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
    } = useAddManualTransactionDetails(props, context)
    return {
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
    }
  }
})
export default class AddManualTransactionDetails extends Vue {
  @Prop({ default: () => undefined }) index: number
  @Prop({ default: () => null }) manualTransaction: ManualTransactionDetails
}
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
