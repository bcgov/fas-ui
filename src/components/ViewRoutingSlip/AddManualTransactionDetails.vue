<template>
  <v-row dense class="mr-8">
    <v-col cols="12">
      <filing-type-auto-complete
        v-model="manualTransactionDetail.filingType"
        required
        :rules="requiredFieldRule"
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
        v-model="manualTransactionDetail.quantity"
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
        :rules="requiredFieldRule"
        v-model.trim="manualTransactionDetail.referenceNumber"
      >
      </v-text-field>
    </v-col>
    <v-col cols="5" class="amount">
      <v-text-field
        filled
        label="$Amount"
        persistent-hint
        :data-test="getIndexedTag('txt-amount', index)"
        required
        disabled
        v-model="manualTransactionDetail.total"
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
        v-model="manualTransactionDetail.isPriorityFee"
        hide-details
        :data-test="getIndexedTag('check-priority', index)"
      ></v-checkbox>
    </v-col>
    <v-col cols="8">
      <v-checkbox
        class="ma-0"
        label="Future Effective Filing Fee"
        v-model="manualTransactionDetail.isFutureEffectiveFiling"
        hide-details
        :data-test="getIndexedTag('check-future-effective', index)"
      ></v-checkbox>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { useAddManualTransactionDetails } from '@/composables/ViewRoutingSlip'
import { ManualTransactionDetails } from '@/models/RoutingSlip'
import { Component, Prop, Vue } from 'vue-property-decorator'
import FilingTypeAutoComplete from '@/components/ViewRoutingSlip/FilingTypeAutoComplete.vue'

@Component({
  components: {
    FilingTypeAutoComplete
  },
  setup (props, context) {
    const {
      manualTransactionDetail,
      requiredFieldRule,
      removeManualTransactionRowEventHandler
    } = useAddManualTransactionDetails(props, context)
    return {
      manualTransactionDetail,
      requiredFieldRule,
      removeManualTransactionRowEventHandler
    }
  }
})
export default class AddManualTransactionDetails extends Vue {
  @Prop({ default: () => null }) value: ManualTransactionDetails
  @Prop({ default: () => undefined }) index: number

  public getIndexedTag (tag, index): string {
    return `${tag}-${index}`
  }
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
