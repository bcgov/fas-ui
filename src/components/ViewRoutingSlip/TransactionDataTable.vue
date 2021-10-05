<template>
  <div>
    <div class="header-bg-color d-flex align-center py-5 mb-0 mt-3">
      <v-icon color="primary" class="ml-8">
          mdi-view-list
      </v-icon>
      <p class="ml-2 mb-0 font-weight-bold" data-test="title">Transactions</p><p class="mb-0 pl-1" v-if="invoiceCount">{{ `(${invoiceCount})` }}</p>
    </div>
    <v-data-table
    :headers="headerTranscations"
    :items="invoiceDisplay"
    class="elevation-1"
    hide-default-footer
    disable-pagination
    >
      <template v-slot:[`header.createdOn`]="{ header }">
      <div class="pl-4">
        {{ header.text }}
      </div>
      </template>
      <template v-slot:[`item.createdOn`]="{ item }">
      <div class="font-weight-bold pl-4">
        {{  formatDisplayDate(item.createdOn, 'MMMM DD, YYYY') }}
      </div>
    </template>
    <template v-slot:[`item.total`]="{ item }">
      <div class="font-weight-bold">
        {{ appendCurrencySymbol(item.total.toFixed(2)) }}
      </div>
    </template>
    <template v-slot:[`item.description`]="{ item }">
      <div v-for="description of item.description" :key="description">
        <p class="font-weight-bold mb-0">
        {{ description }}
        </p>
      </div>
    </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { useTransactionDataTable } from '@/composables/ViewRoutingSlip'
import commonUtil from '@/util/common-util'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  setup (props) {
    const {
      invoiceDisplay,
      headerTranscations,
      invoiceCount,
      transformInvoices,
      routingSlip
    } = useTransactionDataTable(props)
    return {
      invoiceDisplay,
      headerTranscations,
      invoiceCount,
      transformInvoices,
      routingSlip
    }
  }
})
export default class TransactionDataTable extends Vue {
  public formatDisplayDate = commonUtil.formatDisplayDate
  public appendCurrencySymbol = commonUtil.appendCurrencySymbol
}

</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
  .header-bg-color {
    background-color: $BCgovBlue0;
  }
</style>
