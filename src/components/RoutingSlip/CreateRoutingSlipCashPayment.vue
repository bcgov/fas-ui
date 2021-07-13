<template>
    <v-form ref="createRoutingSlipCashPaymentForm">
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
                data-test="txtPaidAmount"
                :rules="paidAmountRules"
                >
                </v-text-field>
            </v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useCreateRoutingSlipCashPayment } from '@/composables/RoutingSlip/useCreateRoutingSlipCashPayment'

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
}
</script>
