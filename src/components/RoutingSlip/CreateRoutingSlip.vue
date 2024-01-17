<template>
  <v-container class="view-container">
    <v-row>
      <v-col>
        <header class="d-flex flex-column mb-0">
          <!-- Back Navigation -->
          <div class="py-0">
            <v-btn
              variant="text"
              size="large"
              data-test="btn-back"
              color="primary"
              class="pl-0"
              @click="cancel"
            >
              <v-icon
                color="primary"
                class="mr-1"
              >
                mdi-arrow-left
              </v-icon>
              <span>Back to Dashboard</span>
            </v-btn>
          </div>
          <h1
            class="view-header__title pt-3"
            data-test="title"
          >
            Add Routing Slip
          </h1>
        </header>
        <div class="header-bg-color d-flex align-center py-5 mb-0 mt-10">
          <v-icon
            color="primary"
            class="ml-8"
          >
            mdi-clipboard-text
          </v-icon>
          <h4 class="ml-2 mb-0 font-weight-bold">
            {{ isReviewMode ? "Review New Routing Slip" : "Add New Routing Slip" }}
          </h4>
        </div>
        <v-card class="my-0">
          <div
            v-if="isReviewMode"
            data-test="reviewRoutingSlip"
          >
            <review-routing-slip />
          </div>
          <div
            v-else
            data-test="createRoutingSlip"
          >
            <create-routing-slip-details ref="createRoutingSlipDetailsRef" />
            <create-routing-slip-payment ref="createRoutingSlipPaymentRef" />
          </div>
          <v-divider />
          <v-card-actions>
            <v-col
              cols="12"
              class="d-inline-flex justify-end pl-3 pr-6 mt-3"
            >
              <v-btn
                v-if="isReviewMode"
                size="large"
                variant="outlined"
                color="primary"
                class="pl-4 pr-5"
                data-test="btn-back-to-edit"
                @click="backToEdit"
              >
                <v-icon class="ma-0">
                  mdi-chevron-left
                </v-icon>
                <span>Back to Edit</span>
              </v-btn>
              <v-spacer />
              <v-btn
                size="large"
                color="primary"
                variant="flat"
                class="px-6 mr-3 font-weight-bold"
                data-test="btn-create-routing-slip"
                @click="createandReviewButtonEventHandler"
              >
                <span>{{ createRoutingSlipLabel }}</span>
              </v-btn>
              <v-btn
                size="large"
                variant="outlined"
                class="px-10 font-weight-bold"
                color="primary"
                data-test="btn-cancel-create-routing-slip"
                @click="cancel"
              >
                <span>Cancel</span>
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Notification Dialog - to be displayed after adding routing slip / cancelling back to dashboard -->
    <ModalDialog
      ref="modalDialogRef"
      :title="modalDialogDetails.modalDialogTitle"
      :text="modalDialogDetails.modalDialogText"
      dialog-class="notify-dialog"
      max-width="679"
      :icon="modalDialogDetails.modalDialogIcon"
      :iconColor="isModalDialogInfo ? 'primary' : 'error'"
    >
      <template #actions>
        <v-btn
          size="large"
          color="primary"
          variant="flat"
          data-test="dialog-ok-button"
          class="font-weight-bold btn-actions"
          @click="modalDialogClose()"
        >
          {{ modalDialogDetails.modalDialogOkText }}
        </v-btn>
        <v-btn
          v-show="!isModalDialogInfo"
          size="large"
          color="primary"
          variant="outlined"
          data-test="dialog-ok-button"
          class="ml-3 btn-actions"
          @click="modalDialogCancel()"
        >
          {{ modalDialogDetails.modalDialogCancelText }}
        </v-btn>
      </template>
    </ModalDialog>
  </v-container>
</template>
<script setup lang="ts">
import CreateRoutingSlipDetails from '@/components/RoutingSlip/CreateRoutingSlipDetails.vue'
import CreateRoutingSlipPayment from '@/components/RoutingSlip/CreateRoutingSlipPayment.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import ReviewRoutingSlip from '@/components/ReviewRoutingSlip/ReviewRoutingSlip.vue'
import { useCreateRoutingSlip } from '@/composables/RoutingSlip'

const {
  createRoutingSlipDetailsRef,
  createRoutingSlipPaymentRef,
  modalDialogRef,
  modalDialogDetails,
  isModalDialogInfo,
  createRoutingSlipLabel,
  isReviewMode,
  cancel,
  modalDialogCancel,
  modalDialogClose,
  createandReviewButtonEventHandler,
  backToEdit
} = useCreateRoutingSlip()
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

.header-bg-color {
  background-color: $BCgovBlue0;
}

.form__btns {
  display: flex;
  justify-content: flex-end;
}
.btn-actions{
  min-width: 110px !important;
}
</style>
