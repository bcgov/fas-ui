<template>
  <div >
    <h3 data-test="title">03.Routing Slip Transaction</h3>
    <div class="my-3">
      <p class="ma-0 align-self-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
        porttitor sem.
      </p>
      <v-btn
      large
      color="primary"
      data-test="btn-add-fund"
      class="mt-2"
      @click="close"
      v-can:fas_edit.hide
      >
        <v-icon class="mr-1">mdi-plus</v-icon>
        <span class="font">Add Transaction Manually</span>
      </v-btn>
    </div>
    <div class="d-flex flex-column">
      <transaction-data-table :invoices=invoices />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TransactionDataTable from './TransactionDataTable.vue'
import { useRoutingSlipTransaction } from '@/composables/ViewRoutingSlip'

@Component({
  components: {
    TransactionDataTable
  },
  setup (_, context) {
    const {
      invoices,
      close
    } = useRoutingSlipTransaction(_, context)
    return {
      invoices,
      close
    }
  }
})
export default class RoutingSlipTransaction extends Vue {}
</script>
