<template>
  <div>
    <header class="d-flex flex-column mb-0">
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
        v-can:fas_edit.hide
        >
          <v-icon class="mr-1">mdi-plus</v-icon>
          <span class="font">Add Transaction Manually</span>
        </v-btn>
      </div>
    </header>
    <div class="d-flex flex-column">
      <transaction-data-table />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TransactionDataTable from './TransactionDataTable.vue'
import can from '@/directives/can'

@Component({
  components: {
    TransactionDataTable
  },
  directives: {
    can
  }
})
export default class RoutingSlipTransaction extends Vue {}
</script>
