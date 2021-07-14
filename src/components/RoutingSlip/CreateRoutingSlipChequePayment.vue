<template>
  <v-form ref="createRoutingSlipChequePaymentForm">
    <v-row class="d-flex pa-0 ma-0 justify-between">
      <v-col cols="12" class="pa-0">
        <div v-for="(cheque, index) in chequeList" :key="index" class="d-flex">
          <v-col cols="4" class="py-0">
            <v-text-field
              filled
              label="Cheque Number"
              persistent-hint
              v-model.trim="cheque.chequeReceiptNumber"
              :data-test="getIndexedTag('number', index)"
              :rules="chequeNumberRules"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4" class="py-0">
            <date-picker
              v-model="cheque.paymentDate"
              :data-test="getIndexedTag('paymentDate', index)"
            ></date-picker>
          </v-col>
          <v-col cols="4" class="py-0">
            <v-text-field
              filled
              label="Amount ($)"
              persistent-hint
              v-model.number="cheque.paidAmount"
              type="number"
              class="textNumber"
              :data-test="getIndexedTag('paidAmount', index)"
              :rules="paidAmountRules"
            >
            </v-text-field>
          </v-col>
          <v-btn
            icon
            class="mt-3 ml-1"
            @click="removeCheque(index)"
            v-if="index !== 0"
          >
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
          readonly
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DatePicker from '@/components/common/DatePicker.vue'
import { useCreateRoutingSlipChequePayment } from '@/composables/RoutingSlip/useCreateRoutingSlipChequePayment'

@Component({
  components: {
    DatePicker
  },
  setup () {
    const {
      totalAmount,
      chequeList,
      createRoutingSlipChequePaymentForm,
      chequeNumberRules,
      paidAmountRules,
      getDefaultRow,
      getIndexedTag,
      addCheque,
      removeCheque,
      isValid
    } = useCreateRoutingSlipChequePayment()
    return {
      totalAmount,
      chequeList,
      createRoutingSlipChequePaymentForm,
      chequeNumberRules,
      paidAmountRules,
      getDefaultRow,
      getIndexedTag,
      addCheque,
      removeCheque,
      isValid
    }
  }
})
export default class CreateRoutingSlipChequePayment extends Vue {}
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
