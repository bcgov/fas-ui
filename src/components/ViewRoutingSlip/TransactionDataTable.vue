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
    class="elevation-1 fas-transactions"
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
    <template v-slot:[`item.actions`]="{ item, index }">
      <template v-if="canShowCancelButton">
        <v-btn
          outlined
          color="primary"
          v-can:fas_transaction.hide
          :data-test="getIndexedTag('btn-invoice-cancel', index)"
          @click="cancel"
        >
          Cancel
        </v-btn>
      </template>
      <span v-if="isInvoiceCancelled(item)" :data-test="getIndexedTag('text-cancel', index)" class="cancel-text-color"> Cancelled </span>
    </template>
    </v-data-table>
    <!-- Confirmation Dialog - to be displayed after clicking cancel on a transaction -->
    <ModalDialog
      ref="modalDialogRef"
      :title="modalDialogDetails.modalDialogTitle"
      :text="modalDialogDetails.modalDialogText"
      dialog-class="notify-dialog"
      data-test="dialog-confirm-cancellation"
      max-width="679"
      max-height="310"
      :icon="modalDialogDetails.modalDialogIcon"
      :iconColor="modalDialogDetails.modalDialogIconColor"
    >
      <template v-slot:actions>
        <v-btn large color="primary" @click="modalDialogConfirm()" data-test="dialog-ok-button" class="font-weight-bold btn-actions">{{ modalDialogDetails.modalDialogOkText }}</v-btn>
        <v-btn large color="primary" outlined @click="modalDialogClose()" data-test="dialog-cancel-button" class="ml-3 btn-actions">{{ modalDialogDetails.modalDialogCancelText }}</v-btn>
      </template>
    </ModalDialog>
  </div>
</template>
<script lang="ts">
import { useTransactionDataTable } from '@/composables/ViewRoutingSlip'
import commonUtil from '@/util/common-util'
import ModalDialog from '@/components/common/ModalDialog.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    ModalDialog
  },
  setup (props) {
    const {
      invoiceDisplay,
      headerTranscations,
      invoiceCount,
      transformInvoices,
      modalDialogRef,
      modalDialogDetails,
      canShowCancelButton,
      cancel,
      modalDialogConfirm,
      modalDialogClose,
      getIndexedTag,
      isInvoiceCancelled
    } = useTransactionDataTable(props)
    return {
      invoiceDisplay,
      headerTranscations,
      invoiceCount,
      transformInvoices,
      modalDialogRef,
      modalDialogDetails,
      canShowCancelButton,
      cancel,
      modalDialogConfirm,
      modalDialogClose,
      getIndexedTag,
      isInvoiceCancelled
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
  .fas-transactions tbody tr td {
      padding: 20px 15px !important;
  }
  .cancel-text-color {
    color: $BCgovInputError;
  }
</style>
