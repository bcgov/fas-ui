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
          v-if="!isRoutingSlipAChild"
        >
          <v-icon class="mr-1">mdi-plus</v-icon>
          <span class="font">Add Transaction Manually</span>
        </v-btn>
      </div>
    </header>
    <v-card v-if="showAddManualTransaction">
      <v-container>
        <v-row>
          <v-col cols="2">
            <p data-test="title" class="text-center font-weight-bold mt-2 pr-10">Add Manual Transaction</p>
          </v-col>
          <v-col cols="10" class="pl-0">
              <v-form
              id="formRoutingSlipManualTransactions"
              ref="formRoutingSlipManualTransactions"
              data-test="form-routing-slip-manual-transactions"
              class="mt-2"
              >
                <div v-for="(transaction, index) in manualTransactionsList" :key="index">
                  <AddManualTransactionDetails
                  :index = index
                  :manualTransaction="transaction"
                  @updateManualTransaction="updateManualTransactionDetails($event,index)"
                  @removeManualTransactionRow="removeManualTransactionRow(index)"
                  :data-test="getIndexedTag('add-manual-transaction-details', index)"/>
                  <v-row dense class="mr-8">
                    <v-col cols="12">
                      <v-divider class="mt-4 mb-4" v-if="isLastChild(index)" />
                    </v-col>
                  </v-row>
                </div>
              </v-form>
            <v-row dense class="mr-8">
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
              <v-col cols="6" class="d-inline-flex justify-end">
                <v-btn
                  large
                  color="primary"
                  class="px-10"
                  data-test="btn-add-transaction"
                  @click="addManualTransactions"
                  :loading="isLoading"
                >
                  <span>Add Transaction</span>
                </v-btn>
                <v-btn
                  large
                  outlined
                  color="primary"
                  class="ml-3"
                  data-test="btn-cancel"
                  @click="hideManualTransaction"
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
      formRoutingSlipManualTransactions,
      showAddManualTransaction,
      manualTransactionsList,
      isRoutingSlipAChild,
      isLoading,
      showManualTransaction,
      addManualTransactionRow,
      addManualTransactions,
      isLastChild,
      isValid,
      removeManualTransactionRow,
      updateManualTransactionDetails,
      hideManualTransaction
    } = useRoutingSlipTransaction()
    return {
      formRoutingSlipManualTransactions,
      showAddManualTransaction,
      manualTransactionsList,
      isRoutingSlipAChild,
      isLoading,
      showManualTransaction,
      addManualTransactionRow,
      addManualTransactions,
      isLastChild,
      isValid,
      removeManualTransactionRow,
      updateManualTransactionDetails,
      hideManualTransaction
    }
  }
})
export default class RoutingSlipTransaction extends Vue {
  public getIndexedTag (tag, index): string {
    return `${tag}-${index}`
  }
}
</script>
