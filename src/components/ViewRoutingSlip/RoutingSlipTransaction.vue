<template>
  <div>
    <header class="d-flex flex-column mb-4">
      <div>
        <div>
          <h3 data-test="title">
            Routing Slip Transaction
          </h3>
          <p class="mb-4">
            {{ $t('routingSlipTransactionSubText') }}
          </p>
        </div>
        <v-btn
          v-if="!isRoutingSlipAChild && !isRoutingSlipVoid && !isRoutingSlipCorrection"
          v-can:fas_transaction.hide
          size="large"
          color="primary"
          data-test="btn-add-transaction"
          @click="showManualTransaction"
        >
          <v-icon class="mr-1">
            mdi-plus
          </v-icon>
          <span class="font">Add Transaction Manually</span>
        </v-btn>
      </div>
    </header>
    <v-card v-if="showAddManualTransaction">
      <v-container>
        <v-row>
          <v-col cols="2">
            <p
              data-test="title"
              class="text-center font-weight-bold mt-2 pr-10 mb-4"
            >
              Add Manual Transaction
            </p>
          </v-col>
          <v-col
            cols="10"
            class="pl-0"
          >
            <v-form
              id="formRoutingSlipManualTransactions"
              ref="formRoutingSlipManualTransactions"
              data-test="form-routing-slip-manual-transactions"
              class="mt-2"
            >
              <div
                v-for="(transaction, index) in manualTransactionsList"
                :key="transaction.key"
              >
                <AddManualTransactionDetails
                  :index="index"
                  :manualTransaction="transaction"
                  :data-test="getIndexedTag('add-manual-transaction-details', index)"
                  @updateManualTransaction="updateManualTransactionDetails($event)"
                  @removeManualTransactionRow="removeManualTransactionRow($event)"
                />
                <v-row
                  dense
                  class="mr-8"
                >
                  <v-col cols="12">
                    <v-divider
                      v-if="isLastChild(index)"
                      class="mt-4 mb-4"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-form>
            <v-row v-if="status">
              <v-col cols="12">
                <p class="mb-0">
                  <span class="pl-1 text-red">{{ $t(status) }}</span>
                </p>
              </v-col>
            </v-row>
            <v-row
              dense
              class="mr-8"
            >
              <v-col cols="6">
                <v-btn
                  size="large"
                  variant="text"
                  color="primary"
                  class="px-0"
                  data-test="btn-add-transaction"
                  @click="addManualTransactionRow"
                >
                  <v-icon
                    size="small"
                    color="primary"
                  >
                    mdi-plus-box
                  </v-icon>
                  <span>Add another transaction</span>
                </v-btn>
              </v-col>
              <v-col
                cols="6"
                class="d-inline-flex justify-end"
              >
                <v-btn
                  size="large"
                  color="primary"
                  class="px-10"
                  data-test="btn-add-transaction"
                  :loading="isLoading"
                  @click="addManualTransactions"
                >
                  <span>Add Transaction</span>
                </v-btn>
                <v-btn
                  size="large"
                  variant="outlined"
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
    <div
      v-if="routingSlip && routingSlip.number"
      class="d-flex flex-column"
    >
      <transaction-data-table :key="routingSlip.number" />
    </div>
  </div>
</template>
<script setup lang="ts">
import AddManualTransactionDetails from './AddManualTransactionDetails.vue'
import TransactionDataTable from './TransactionDataTable.vue'
import { useRoutingSlipTransaction } from '@/composables/ViewRoutingSlip'
import { can as vCan } from '@/directives/can'

const {
  formRoutingSlipManualTransactions,
  showAddManualTransaction,
  manualTransactionsList,
  isRoutingSlipAChild,
  isRoutingSlipVoid,
  isRoutingSlipCorrection,
  isLoading,
  showManualTransaction,
  addManualTransactionRow,
  addManualTransactions,
  isLastChild,
  removeManualTransactionRow,
  updateManualTransactionDetails,
  hideManualTransaction,
  status,
  routingSlip
} = useRoutingSlipTransaction()

const getIndexedTag = (tag, index) => {
  return `${tag}-${index}`
}
</script>
