<template>
  <v-form id="formManualTransactionDetails" ref="formManualTransactionDetails" class="mt-2">
    <div v-for="(transaction, index) in manualTransactionsList" :key="index">
      <v-row dense>
        <v-col cols="2">
          <v-text-field
            filled
            label="Quantity"
            persistent-hint
            data-test="txtQuantity"
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
            data-test="txtIncorporation"
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
            data-test="txtAmount"
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
          v-if="index>0"
          :data-test="getIndexedTag('removeChecque', index)"
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
          ></v-checkbox>
        </v-col>
        <v-col cols="8">
          <v-checkbox
            class="ma-0"
            label="Future Effective Filing Fee"
            v-model="transaction.isFutureEffectiveDate"
            hide-details
          ></v-checkbox>
        </v-col>
        <v-col cols="11">
          <v-divider class="mt-4 mb-4" v-if="isDividerVisible(index)"/>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>
<script lang="ts">
import { useAddManualTransactionDetails } from '@/composables/ViewRoutingSlip'
import { ManualTransactionDetails } from '@/models/RoutingSlip'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  setup (props, context) {
    const {
      manualTransactionsList,
      quantityRules,
      referenceNumberRules,
      formManualTransactionDetails,
      isDividerVisible,
      isValid,
      addManualTransactionRow,
      removeManualTransactionRow
    } = useAddManualTransactionDetails(
      props,
      context
    )
    return {
      manualTransactionsList,
      quantityRules,
      referenceNumberRules,
      formManualTransactionDetails,
      isDividerVisible,
      isValid,
      addManualTransactionRow,
      removeManualTransactionRow
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