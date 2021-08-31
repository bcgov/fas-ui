<template>
  <v-form
    id="formManualTransactionDetails"
    ref="formManualTransactionDetails"
    data-test="form-manual-transaction-details"
    class="mt-2"
  >
    <div v-for="(transaction, index) in manualTransactionsList" :key="index">
      <v-row dense>
        <v-col cols="11">
          <FIlingTypeAutoComplete v-model="filingType" />
        </v-col>
        <v-col cols="2">
          <v-text-field
            filled
            label="Quantity"
            persistent-hint
            :data-test="getIndexedTag('txt-quantity', index)"
            required
            :rules="quantityRules"
            v-model="transaction.quantity"
            type="number"
          >
          </v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field
            filled
            label="Incorporation/Reference Number"
            persistent-hint
            :data-test="getIndexedTag('txt-incorporation', index)"
            required
            :rules="referenceNumberRules"
            v-model.trim="transaction.referenceNumber"
          >
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            filled
            label="$Amount"
            persistent-hint
            :data-test="getIndexedTag('txt-amount', index)"
            required
            disabled
            v-model="transaction.amount"
          >
          </v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn
            icon
            class="mt-3 ml-1"
            @click="removeManualTransactionRow(index)"
            v-if="index > 0"
            :data-test="getIndexedTag('btn-remove', index)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-checkbox
            class="ma-0"
            label="Priority Fee"
            v-model="transaction.isPriorityFee"
            hide-details
            :data-test="getIndexedTag('check-priority', index)"
          ></v-checkbox>
        </v-col>
        <v-col cols="8">
          <v-checkbox
            class="ma-0"
            label="Future Effective Filing Fee"
            v-model="transaction.isFutureEffectiveFiling"
            hide-details
            :data-test="getIndexedTag('check-future-effective', index)"
          ></v-checkbox>
        </v-col>
        <v-col cols="11">
          <v-divider class="mt-4 mb-4" v-if="isDividerVisible(index)" />
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>
<script lang="ts">
import { useAddManualTransactionDetails } from '@/composables/ViewRoutingSlip'
import { ManualTransactionDetails } from '@/models/RoutingSlip'
import { Component, Prop, Vue } from 'vue-property-decorator'
import FIlingTypeAutoComplete from '@/components/ViewRoutingSlip/FIlingTypeAutoComplete.vue'

@Component({
  components: {
    FIlingTypeAutoComplete
  },
  setup (props, context) {
    const {
      manualTransactionsList,
      quantityRules,
      referenceNumberRules,
      formManualTransactionDetails,
      isDividerVisible,
      addManualTransactionRow,
      isValid,
      removeManualTransactionRow,
      filingType
    } = useAddManualTransactionDetails(props, context)
    return {
      manualTransactionsList,
      quantityRules,
      referenceNumberRules,
      formManualTransactionDetails,
      isDividerVisible,
      addManualTransactionRow,
      isValid,
      removeManualTransactionRow,
      filingType
    }
  }
})
export default class AddManualTransactionDetails extends Vue {
  @Prop({ default: () => [] }) value: ManualTransactionDetails[]

  public getIndexedTag (tag, index): string {
    return `${tag}-${index}`
  }
}
</script>
