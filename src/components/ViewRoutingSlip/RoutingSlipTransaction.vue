<template>
  <div>
    <header class="d-flex flex-column mb-4">
      <div>
        <div>
          <h3 data-test="title">04.Routing Slip Transaction</h3>
          <p>
            {{ $t('routingSlipTransactionSubText') }}
          </p>
        </div>
        <v-btn
          large
          color="primary"
          data-test="btn-add-transaction"
          v-can:fas_transaction.hide
          @click="showManualTransaction"
        >
          <v-icon class="mr-1">mdi-plus</v-icon>
          <span class="font">Add Transaction Manually</span>
        </v-btn>
      </div>
    </header>
    <v-card v-show="showAddManualTransaction">
      <v-container>
        <v-row>
          <v-col cols="2">
            <p data-test="title" class="text-center font-weight-bold mt-2 pr-10">Add Manual Transaction</p>
          </v-col>
          <v-col cols="10" class="pl-0">
            <AddManualTransactionDetails :manualTransactionsList="addManualTransactionsList" ref="addManualTransactionDetailsRef"/>
            <v-row dense>
              <v-col cols="6">
                <v-btn
                  large
                  text
                  color="primary"
                  class="px-0"
                  data-test="btn-add-transaction"
                  @click="addManualTransactionRow"
                >
                  <v-icon dense color="primary">mdi-plus-box</v-icon>
                  <span>Add another transaction</span>
                </v-btn>
              </v-col>
              <v-col cols="5" class="d-inline-flex justify-end">
                <v-btn
                  large
                  color="primary"
                  class="px-10"
                  data-test="btn-add-transaction"
                  @click="addManualTransactions"
                >
                  <span>Add Transaction</span>
                </v-btn>
                <v-btn
                  large
                  outlined
                  color="primary"
                  class="ml-3"
                  data-test="btn-cancel"
                >
                  <span class="font-weight-bold">Cancel</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div class="d-flex flex-column">
      <transaction-data-table />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddManualTransactionDetails from './AddManualTransactionDetails.vue'
import TransactionDataTable from './TransactionDataTable.vue'
import can from '@/directives/can'
import { useRoutingSlipTransaction } from '@/composables/ViewRoutingSlip'

@Component({
  components: {
    TransactionDataTable,
    AddManualTransactionDetails
  },
  directives: {
    can
  },
  setup () {
    const {
      addManualTransactionDetailsRef,
      showAddManualTransaction,
      addManualTransactionsList,
      showManualTransaction,
      addManualTransactionRow,
      addManualTransactions
    } = useRoutingSlipTransaction()
    return {
      addManualTransactionDetailsRef,
      showAddManualTransaction,
      addManualTransactionsList,
      showManualTransaction,
      addManualTransactionRow,
      addManualTransactions
    }
  }
})
export default class RoutingSlipTransaction extends Vue {}
</script>
