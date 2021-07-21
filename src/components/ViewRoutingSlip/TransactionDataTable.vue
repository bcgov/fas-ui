<template>
  <div>
    <div class="header-bg-color d-flex align-center py-5 mb-0">
      <v-icon color="primary" class="ml-8">
          mdi-view-list
      </v-icon>
      <p class="ml-2 mb-0 font-weight-bold" data-test="title">Transactions</p><p class="mb-0">{{ `(${invoiceCount})` }}</p>
    </div>
    <v-data-table
    :headers="headerTranscations"
    :items="invoiceDto"
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
        {{ item.createdOn }}
      </div>
    </template>
    <template v-slot:[`item.total`]="{ item }">
      <div class="font-weight-bold">
        {{ `$${item.total}` }}
      </div>
    </template>
    <template v-slot:[`item.description`]="{ item }">
      <div class="font-weight-bold">
        {{ item.description }}
      </div>
    </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import { useTransactionDataTable } from '@/composables/ViewRoutingSlip'
import { Invoice } from '@/models/Invoice'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  setup (props, _) {
    const {
      invoiceDto,
      headerTranscations,
      invoiceCount,
      transformInvoices
    } = useTransactionDataTable(props, _)
    return {
      invoiceDto,
      headerTranscations,
      invoiceCount,
      transformInvoices
    }
  }
})
export default class TransactionDataTable extends Vue {
  @Prop({ default: null }) invoices: Invoice[]
}

</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
  .header-bg-color {
    background-color: $BCgovBlue0;
  }
</style>
