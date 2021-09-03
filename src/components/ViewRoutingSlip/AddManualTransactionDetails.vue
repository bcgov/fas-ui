<template>
  <v-row dense class="mr-8" v-if="manualTransactionDetails">
    <v-col cols="12">
      <!-- calling @input rather than @keyup because @keyup used by the compoennt already !-->
      <filing-type-auto-complete
        v-model="manualTransactionDetails.filingType"
        required
        :rules="requiredFieldRule"
        @input="delayedCalculateTotal()"
      />
    </v-col>
    <v-col cols="2">
      <v-text-field
        filled
        label="Quantity"
        persistent-hint
        :data-test="getIndexedTag('txt-quantity', index)"
        required
        :rules="requiredFieldRule"
        v-model="manualTransactionDetails.quantity"
        type="number"
        @keyup="delayedCalculateTotal()"
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
        :rules="requiredFieldRule"
        v-model.trim="manualTransactionDetails.referenceNumber"
      >
      </v-text-field>
    </v-col>
    <v-col cols="5" class="amount" :key="manualTransactionDetails.total">
      <v-text-field
        filled
        label="$Amount"
        persistent-hint
        :data-test="getIndexedTag('txt-amount', index)"
        disabled
        v-model="manualTransactionDetails.total"
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
    <v-col cols="2">
      <v-checkbox
        class="ma-0"
        label="Priority Fee"
        v-model="manualTransactionDetails.priority"
        hide-details
        :data-test="getIndexedTag('check-priority', index)"
        @change="calculateTotal()"
      ></v-checkbox>
    </v-col>
    <v-col cols="8">
      <v-checkbox
        class="ma-0"
        label="Future Effective Filing Fee"
        v-model="manualTransactionDetails.futureFiling"
        hide-details
        :data-test="getIndexedTag('check-future-effective', index)"
        @change="calculateTotal()"
      ></v-checkbox>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { useAddManualTransactionDetails } from '@/composables/ViewRoutingSlip'
import { Component, Prop, Vue } from 'vue-property-decorator'
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
      getIndexedTag
    } = useAddManualTransactionDetails(props, context)
    return {
      manualTransactionDetails,
      requiredFieldRule,
      removeManualTransactionRowEventHandler,
      calculateTotal,
      delayedCalculateTotal,
      getIndexedTag
    }
  }
})
export default class AddManualTransactionDetails extends Vue {
  @Prop({ default: () => undefined }) index: number
  @Prop({ default: () => null }) manualTransaction: ManualTransactionDetails
}
</script>
<style lang="scss" scoped>
.amount {
  position: relative;
  .close-icon {
    position: absolute;
    right: -32px;
    top: 0;
  }
}
</style>
