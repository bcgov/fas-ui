<template>
  <div>
    <header class="d-flex flex-column mb-0">
      <h3 data-test="title">Routing Slip Information</h3>
      <p>{{ $t('routingSlipInfoSubText') }}</p>
    </header>
    <v-card class="pl-5 py-2 pr-5">
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
                  <span
                    class="primary--text cursor-pointer"
                    @click="toggleEdit(true)"
                    v-if="!isRoutingSlipAChild"
                    data-test="btn-edit"
                    v-can:fas_edit.hide
                    ><v-icon color="primary" size="20"> mdi-pencil</v-icon> Edit
                    Status</span
                  >
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
            <v-row v-if="!editMode">
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Status
              </v-col>
              <v-col class="col-6 col-sm-9">
                <span
                :key="routingSlipDetails.status"
                  :class="colors(routingSlipDetails.status)"
                  class="slip-status "
                  data-test="label-status"
                  >{{ getStatusLabel(routingSlipDetails.status) }}</span
                >
              </v-col>
            </v-row>
            <!-- show only on edit -->
            <template v-else>
              <v-row>
                <v-col class="col-6 col-sm-3 font-weight-bold">
                  Status
                </v-col>
                <v-col class="col-6 col-sm-9 status-list">
                  <status-list
                    v-model="currentStatus"
                    label="Status"
                    @change="statusChange"
                    :hide-details="errorMessage === ''"
                    :error-messages="errorMessage"
                    :disabled="isApprovalFlow"
                  ></status-list>
                </v-col>
              </v-row>
            </template>
            <v-expand-transition>
              <template v-if="showAddress">
                <refund-request-form
                  ref="refundRequestForm"
                  :inputRefundRequestDetails="refundRequestDetails"
                  :isEditing="showAddressEditMode"
                  @update:refundRequestDetails="refundRequestDetails = $event"
                >
                </refund-request-form>
              </template>
            </v-expand-transition>

            <v-row>
              <v-col class="col-6 col-sm-3 font-weight-bold">
                Entity Number
              </v-col>
              <v-col
                class="col-6 col-sm-9"
                v-if="
                  routingSlipDetails.paymentAccount &&
                    routingSlipDetails.paymentAccount.accountName
                "
              >
                {{ routingSlipDetails.paymentAccount.accountName }}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="pr-4 justify-end pa-3 pb-5" v-if="editMode">
        <v-btn
          large
          color="primary"
          @click="updateStatus()"
          class="px-8 font-weight-bold"
          data-test="btn-edit-routing-done"
        >
          <span>{{isApprovalFlow ? 'Authorize' :  'Done'}}</span>
        </v-btn>
        <v-btn
          large
          outlined
          class="px-7"
          color="primary"
          @click="cancelOrReject()"
          data-test="btn-edit-routing-cancel"
        >
          <span>Cancel</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import commonUtil from '@/util/common-util'
import { useRoutingSlipInfo } from '@/composables/ViewRoutingSlip'
import statusList from '@/components/common/StatusList.vue'
import RefundRequestForm from '@/components/ViewRoutingSlip/RefundRequestForm.vue'
import can from '@/directives/can'

@Component({
  components: {
    RefundRequestForm,
    statusList
  },
  directives: {
    can
  },
  setup (props) {
    const {
      routingSlipDetails,
      editMode,
      toggleEdit,
      currentStatus,
      updateStatus,
      getStatusLabel,
      isRoutingSlipAChild,
      statusChange,
      showAddress,
      refundRequestForm,
      refundRequestDetails,
      errorMessage,
      showAddressEditMode,
      isApprovalFlow,
      cancelOrReject,
      isEditable
    } = useRoutingSlipInfo(props)

    return {
      routingSlipDetails,
      editMode,
      toggleEdit,
      currentStatus,
      updateStatus,
      getStatusLabel,
      isRoutingSlipAChild,
      statusChange,
      showAddress,
      refundRequestForm,
      refundRequestDetails,
      errorMessage,
      showAddressEditMode,
      isApprovalFlow,
      cancelOrReject,
      isEditable
    }
  }
})
export default class RoutingSlipInfo extends Vue {
  public colors = commonUtil.statusListColor
  public formatDisplayDate = commonUtil.formatDisplayDate
}
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
