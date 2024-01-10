<template>
  <div>
    <header class="d-flex flex-column">
      <h3 data-test="title">
        Routing Slip Information
      </h3>
    </header>
    <v-card class="pl-5 py-2 mt-5 pr-5">
      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-12 col-sm-12 ">
            <v-row>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Routing Slip - Unique ID
              </v-col>
              <v-col class="col-6 col-sm-9 d-flex justify-space-between">
                <div>
                  {{ routingSlipDetails.number }}
                </div>

                <div v-if="isEditable">
                  <status-menu
                    v-model="currentStatus"
                    :error-messages="errorMessage"
                    :isApprovalFlow="isApprovalFlow"
                    :allowedStatusList="allowedStatusList"
                    data-test="btn-edit"
                    @update:statusChange="statusChange"
                  />
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Date
              </v-col>

              <v-col class="col-6 col-sm-9">
                {{
                  formatDisplayDate(
                    routingSlipDetails.routingSlipDate,
                    'MMM DD, YYYY'
                  )
                }}
              </v-col>
            </v-row>
            <v-row>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Status
              </v-col>
              <v-col class="col-6 col-sm-9">
                <span
                  :key="routingSlipDetails.status"
                  :class="colors(routingSlipDetails.status)"
                  class="slip-status "
                  data-test="label-status"
                >{{ getStatusLabel(routingSlipDetails.status) }}</span>
              </v-col>
            </v-row>

            <v-expand-transition>
              <template v-if="showAddress && addMoreDetails">
                <RefundRequestForm
                  ref="refundRequestForm"
                  :inputRefundRequestDetails="refundRequestDetails"
                  :isEditing="showAddressEditMode"
                  :isApprovalFlow="isApprovalFlow"
                  @update:refundRequestDetails="refundRequestDetails = $event"
                />
              </template>
            </v-expand-transition>

            <v-row>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Entity Number
              </v-col>
              <v-col
                v-if="
                  routingSlipDetails.paymentAccount &&
                    routingSlipDetails.paymentAccount.accountName
                "
                class="col-6 col-sm-9"
              >
                {{ routingSlipDetails.paymentAccount.accountName }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions
        v-if="addMoreDetails"
        class="pr-4 justify-end pa-3 pb-5"
      >
        <v-btn
          size="large"
          color="primary"
          class="px-8 font-weight-bold"
          data-test="btn-edit-routing-done"
          :loading="isLoading"
          @click="updateStatus()"
        >
          <span>{{ isApprovalFlow ? 'Authorize' : 'Done' }}</span>
        </v-btn>
        <v-btn
          size="large"
          variant="outlined"
          class="px-7"
          color="primary"
          data-test="btn-edit-routing-cancel"
          @click="cancelOrReject()"
        >
          <span>Cancel</span>
        </v-btn>
      </v-card-actions>
    </v-card>
    <ModalDialog
      ref="modalDialogRef"
      :title="modalText.title"
      dialog-class="notify-dialog"
      max-width="680"
      max-height="310"
      :icon="modalText.icon"
      iconColor="error"
    >
      <template #text>
        <p
          class="mb-0 px-6"
          v-html="modalText.subText"
        />
      </template>
      <template
        v-if="modalText.isError"
        #actions
      >
        <v-btn
          size="large"
          color="primary"
          data-test="dialog-ok-button"
          class="px-5 font-weight-bold btn-actions"
          @click="closeErrorDialog()"
        >
          Ok
        </v-btn>
      </template>
      <template
        v-else
        #actions
      >
        <v-btn
          size="large"
          color="primary"
          data-test="dialog-ok-button"
          class="px-5 font-weight-bold btn-actions"
          @click="updateStatus()"
        >
          {{ modalText.confirmBtnText }}
        </v-btn>
        <v-btn
          size="large"
          color="primary"
          variant="outlined"
          data-test="dialog-ok-button"
          class="ml-3 btn-actions"
          @click="cancelOrReject()"
        >
          Cancel
        </v-btn>
      </template>
    </ModalDialog>
  </div>
</template>
<script setup lang="ts">
import ModalDialog from '@/components/common/ModalDialog.vue'
import RefundRequestForm from '@/components/ViewRoutingSlip/RefundRequestForm.vue'
import StatusMenu from '@/components/common/StatusMenu.vue'
import commonUtil from '@/util/common-util'
import { useRoutingSlipInfo } from '@/composables/ViewRoutingSlip'

const {
  routingSlipDetails,
  addMoreDetails,
  currentStatus,
  updateStatus,
  getStatusLabel,
  statusChange,
  showAddress,
  refundRequestForm,
  refundRequestDetails,
  errorMessage,
  showAddressEditMode,
  isApprovalFlow,
  cancelOrReject,
  isEditable,
  allowedStatusList,
  modalDialogRef,
  modalText,
  isLoading,
  closeErrorDialog
} = useRoutingSlipInfo()

const colors = commonUtil.statusListColor
const formatDisplayDate = commonUtil.formatDisplayDate
</script>

<style lang="scss" scoped>
.slip-status {
  text-transform: capitalize;
}
.row + .row {
  margin-top: 7px !important;
}
.status-list {
  max-width: 400px;
}
</style>
