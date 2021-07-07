<template>
    <v-form>
        <v-row class="d-flex pa-0 ma-0 justify-between">
            <v-col cols="12" class="pa-0">
                <div v-for="(cheque, index) in chequeList" :key="index" class="d-flex">
                    <v-col cols="4" class="py-0">
                        <v-text-field
                        filled
                        label="Cheque Number"
                        persistent-hint
                        v-model="cheque.chequeNumber"
                        :data-test="getIndexedTag('chequeNumber', index)"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <v-text-field
                        filled
                        label="Cheque Date(optional)"
                        persistent-hint
                        v-model="cheque.chequeDate"
                        :data-test="getIndexedTag('chequeDate', index)"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="4" class="py-0">
                        <v-text-field
                        filled
                        label="Amount ($)"
                        persistent-hint
                        v-model="cheque.chequeAmount"
                        :data-test="getIndexedTag('chequeAmount', index)"
                        >
                        </v-text-field>
                    </v-col>
                    <v-btn icon class="mt-3 ml-1"
                    @click="removeCheque(index)" v-if="index !== 0">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row class="d-flex pa-0 ma-0 justify-between">
            <v-col cols="4" class="py-0">
                <v-btn
                text
                data-test="add-cheque-button"
                class="px-0"
                @click="addCheque"
                color="primary"
                >
                <v-icon dense color="primary">mdi-plus-box</v-icon>
                <span class="font-weight-bold">Additional Cheque</span>
                </v-btn>
            </v-col>
        </v-row>
        <v-row class="d-flex px-0 mx-0 justify-between">
            <v-col class="py-0">
                <v-text-field
                filled
                label="Total Amount Received ($)"
                req
                persistent-hint
                data-test="txtAmount"
                v-model="totalAmount"
                >
                </v-text-field>
            </v-col>
        </v-row>
    </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useCreateRoutingSlipChequePayment } from '@/composables/RoutingSlip/useCreateRoutingSlipChequePayment'

@Component({
  setup () {
    const {
      totalAmount,
      chequeList,
      onMounted,
      getDefaultRow,
      getIndexedTag,
      addCheque,
      removeCheque
    } = useCreateRoutingSlipChequePayment()
    return {
      totalAmount,
      chequeList,
      onMounted,
      getDefaultRow,
      getIndexedTag,
      addCheque,
      removeCheque
    }
  }
})
export default class CreateRoutingSlipChequePayment extends Vue {
}
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

</style>
