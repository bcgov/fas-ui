<template>
  <div>
    <div class="header-bg-color d-flex align-center py-5 mb-0 mt-3">
      <v-icon
        color="primary"
        class="ml-8"
      >
        mdi-view-list
      </v-icon>
      <p
        class="ml-2 mb-0 font-weight-bold"
        data-test="title"
      >
        Transactions
      </p><p
        v-if="invoiceCount"
        class="mb-0 pl-1"
      >
        {{ `(${invoiceCount})` }}
      </p>
    </div>
    <v-data-table
      :headers="headerTranscations"
      :items="invoiceDisplay"
      class="elevation-1 fas-transactions"
      :hide-default-footer="true"
    >
      <template #[`header.createdOn`]="{ column }">
        <div class="pl-4">
          {{ column.title }}
        </div>
      </template>
      <template #[`item.createdOn`]="{ item }">
        <div class="font-weight-bold pl-4">
          {{ formatDisplayDate(item.createdOn, 'MMMM DD, YYYY') }}
        </div>
      </template>
      <template #[`item.total`]="{ item }">
        <div class="font-weight-bold">
          {{ appendCurrencySymbol(item.total.toFixed(2)) }}
        </div>
      </template>
      <template #[`item.description`]="{ item }">
        <div
          v-for="description of item.description"
          :key="description"
        >
          <p class="font-weight-bold mb-0">
            {{ description }}
          </p>
        </div>
      </template>
      <template #[`item.actions`]="{ item, index }">
        <span
          v-if="isAlreadyCancelled(item.statusCode)"
          :data-test="getIndexedTag('text-cancel', index)"
          class="text-error font-weight-bold"
        > Cancelled </span>
        <template v-else>
          <v-btn
            v-can:fas_refund.hide
            variant="outlined"
            color="primary"
            :data-test="getIndexedTag('btn-invoice-cancel', index)"
            :disabled="disableCancelButton"
            @click="cancel(item.id)"
          >
            Cancel
          </v-btn>
        </template>
      </template>
      <!-- hide pagination -->
      <template #bottom />
    </v-data-table>
    <!-- Confirmation Dialog - to be displayed after clicking cancel on a transaction -->
    <ModalDialog
      ref="modalDialogRef"
      :title="modalDialogDetails.modalDialogTitle"
      :text="modalDialogDetails.modalDialogText"
      dialog-class="notify-dialog"
      data-test="dialog-confirm-cancellation"
      max-width="639"
      max-height="327"
      :icon="modalDialogDetails.modalDialogIcon"
      :iconColor="modalDialogDetails.modalDialogIconColor"
    >
      <template #actions>
        <v-btn
          size="large"
          color="primary"
          data-test="dialog-ok-button"
          :loading="isLoading"
          class="font-weight-bold btn-actions"
          @click="modalDialogConfirm"
        >
          {{ modalDialogDetails.modalDialogOkText }}
        </v-btn>
        <v-btn
          size="large"
          color="primary"
          variant="outlined"
          data-test="dialog-cancel-button"
          class="ml-3 btn-actions"
          @click="modalDialogClose"
        >
          {{ modalDialogDetails.modalDialogCancelText }}
        </v-btn>
      </template>
    </ModalDialog>
  </div>
</template>
<script setup lang="ts">
import ModalDialog from '@/components/common/ModalDialog.vue'
import commonUtil from '@/util/common-util'
import { useTransactionDataTable } from '@/composables/ViewRoutingSlip'

const {
  invoiceDisplay,
  headerTranscations,
  invoiceCount,
  modalDialogRef,
  modalDialogDetails,
  isLoading,
  cancel,
  modalDialogConfirm,
  modalDialogClose,
  getIndexedTag,
  disableCancelButton,
  isAlreadyCancelled
} = useTransactionDataTable()
const formatDisplayDate = commonUtil.formatDisplayDate
const appendCurrencySymbol = commonUtil.appendCurrencySymbol
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
  .header-bg-color {
    background-color: $BCgovBlue0;
  }
  .v-data-table {
    ::v-deep .v-data-table__wrapper>table>tbody>tr>td {
      padding: 20px 15px !important;
    }
  }

</style>
