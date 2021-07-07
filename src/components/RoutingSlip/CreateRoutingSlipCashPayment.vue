<template>
    <v-form>
        <v-row class="d-flex pa-0 ma-0 justify-between">
            <!-- Receipt Number -->
            <v-col cols="6" class="py-0">
                <v-text-field
                filled
                label="Receipt Number"
                req
                persistent-hint
                v-model="receiptNumber"
                data-test="txtReceiptNumber"
                >
                </v-text-field>
            </v-col>
            <!-- Name of person -->
            <v-col cols="6" class="py-0">
                <v-text-field
                filled
                label="Amount ($)"
                req
                persistent-hint
                v-model="totalAmount"
                data-test="txtRoutingSlipPersonName"
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
      receiptNumber,
      totalAmount
    } = useCreateRoutingSlipCashPayment()
    return {
      receiptNumber,
      totalAmount
    }
  }
})
export default class CreateRoutingSlipCashPayment extends Vue {
}
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
</style>
