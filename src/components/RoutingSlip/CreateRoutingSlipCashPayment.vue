<template>
    <v-form ref="createRoutingSlipCashPaymentForm" :disabled="isViewMode">
        <v-row class="d-flex pa-0 ma-0 justify-between">
            <v-col cols="6" class="py-0">
                <v-text-field
                filled
                label="Receipt Number"
                persistent-hint
                v-model.trim="chequeReceiptNumber"
                data-test="txtReceiptNumber"
                :rule="receiptNumberRules"
                >
                </v-text-field>
            </v-col>
            <v-col cols="6" class="py-0">
                <v-text-field
                filled
                label="Amount ($)"
                persistent-hint
                v-model.number="paidAmount"
                type="number"
                data-test="txtPaidAmount"
                :rules="paidAmountRules"
                class="textNumber"
                >
                </v-text-field>
            </v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useCreateRoutingSlipCashPayment } from '@/composables/RoutingSlip'

@Component({
  setup () {
    const {
      chequeReceiptNumber,
      paidAmount,
      createRoutingSlipCashPaymentForm,
      receiptNumberRules,
      paidAmountRules,
      isValid
    } = useCreateRoutingSlipCashPayment()
    return {
      chequeReceiptNumber,
      paidAmount,
      createRoutingSlipCashPaymentForm,
      receiptNumberRules,
      paidAmountRules,
      isValid
    }
  }
})
export default class CreateRoutingSlipCashPayment extends Vue {
  @Prop({ default: false }) isViewMode: boolean
}
</script>
<style lang="scss" scoped>
  .textNumber input[type='number'] {
    -moz-appearance:textfield;
  }
  .textNumber input::-webkit-outer-spin-button,
  .textNumber input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
