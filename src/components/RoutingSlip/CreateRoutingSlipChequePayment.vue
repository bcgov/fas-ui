<template>
  <v-form ref="createRoutingSlipChequePaymentForm">
    <v-row class="d-flex pa-0 ma-0 justify-between mb-4">
      <v-col
        cols="12"
        class="pa-0"
      >
        <div
          v-for="(cheque, index) in chequeList"
          :key="index"
          class="d-flex mb-4"
        >
          <v-col
            :cols="getColumnWidth"
            class="py-0"
          >
            <v-text-field
              v-model.trim="cheque.chequeReceiptNumber"
              variant="filled"
              label="Cheque Number"
              persistent-hint
              :data-test="getIndexedTag('number', index)"
              :rules="chequeNumberRules"
            />
          </v-col>
          <v-col
            :cols="getColumnWidth"
            class="py-0"
          >
            <date-picker
              v-model="cheque.paymentDate"
              label="Cheque Date"
              :data-test="getIndexedTag('paymentDate', index)"
              clearable
              :rules="paymentDateRules"
            />
          </v-col>
          <v-col
            :cols="getColumnWidth"
            class="py-0"
          >
            <v-text-field
              v-model.number="cheque.paidAmount"
              variant="filled"
              label="Amount(CAD$)"
              persistent-hint
              type="number"
              class="textNumber"
              :data-test="getIndexedTag('paidAmount', index)"
              :rules="paidAmountRules"
            />
          </v-col>
          <v-col
            v-if="isTheAmountPaidInUsd"
            cols="3"
            class="py-0"
          >
            <v-text-field
              v-model.number="cheque.paidUsdAmount"
              variant="filled"
              label="Amount(USD$)"
              persistent-hint
              type="number"
              class="textNumber"
              :data-test="getIndexedTag('paidUsdAmount', index)"
              :rules="paidUsdAmountRules"
            />
          </v-col>
          <v-btn
            v-if="index>0"
            icon
            variant="text"
            color="grey"
            class="mt-3 ml-1"
            :data-test="getIndexedTag('removeChecque', index)"
            @click="removeCheque(index)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex pa-0 ma-0 justify-between">
      <v-col
        cols="9"
        class="py-0"
      >
        <v-btn
          variant="text"
          data-test="add-cheque-button"
          class="px-0"
          color="primary"
          @click="addCheque()"
        >
          <v-icon
            size="small"
            color="primary"
          >
            mdi-plus-box
          </v-icon>
          <span class="font-weight-bold">Additional Cheque</span>
        </v-btn>
      </v-col>
      <v-col
        cols="3"
        class="d-flex justify-end py-0"
      >
        <v-checkbox
          v-model="isTheAmountPaidInUsd"
          label="Funds received in USD"
          hide-details
          class="ma-0"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex px-0 mx-0 justify-between">
      <v-col class="py-0">
        <v-text-field
          v-model="totalAmount"
          variant="filled"
          label="Total Amount Received ($)"
          req
          persistent-hint
          data-test="txtAmount"
          readonly
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import DatePicker from '@/components/common/DatePicker.vue'
import { useCreateRoutingSlipChequePayment } from '@/composables/RoutingSlip'
const {
  totalAmount,
  chequeList,
  createRoutingSlipChequePaymentForm,
  chequeNumberRules,
  paidAmountRules,
  paidUsdAmountRules,
  paymentDateRules,
  isTheAmountPaidInUsd,
  getColumnWidth,
  getIndexedTag,
  addCheque,
  removeCheque
} = useCreateRoutingSlipChequePayment()

// TODO move to composable
const isValid = async () => (await createRoutingSlipChequePaymentForm.value.validate()).length === 0

defineExpose({
  isValid
})
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
