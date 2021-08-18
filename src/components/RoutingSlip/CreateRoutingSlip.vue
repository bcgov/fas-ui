<template>
  <v-container class="view-container">
    <v-row>
      <v-col>
        <header class="d-flex flex-column mb-0">
          <!-- Back Navigation -->
          <div class="py-0">
            <v-btn
            text
            large
            data-test="btn-back"
            @click="cancel"
            color="primary"
            class="pl-0">
              <v-icon color="primary" class="mr-1">mdi-arrow-left</v-icon>
              <span>Back to Dashboard</span>
            </v-btn>
          </div>
          <h1 class="view-header__title pt-3" data-test="title">Add Routing Slip</h1>
          <p>
            {{ $t('createRoutingSlipSubText') }}
          </p>
        </header>
        <div class="header-bg-color d-flex align-center py-5 mb-0 mt-10">
          <v-icon color="primary" class="ml-8">
            mdi-clipboard-text
          </v-icon>
          <h4 class="ml-2 mb-0 font-weight-bold">{{ isReviewMode ? "Review New Routing Slip" : "Add New Routing Slip" }}</h4>
        </div>
        <v-card class="my-0">
          <div v-if="isReviewMode" data-test="reviewRoutingSlip">
            <review-routing-slip/>
          </div>
          <div v-else data-test="createRoutingSlip">
            <create-routing-slip-details ref="createRoutingSlipDetailsRef" />
            <create-routing-slip-payment ref="createRoutingSlipPaymentRef" />
          </div>
          <v-divider></v-divider>
          <v-card-actions>
            <v-col cols="12" class="d-inline-flex justify-end pl-3 pr-6 mt-3">
              <v-btn
                large
                outlined
                color="primary"
                @click="backToEdit"
                class="pl-4 pr-5 font-weight-bold"
                data-test="btn-back-to-edit"
                v-if="isReviewMode"
              >
                <v-icon class="ma-0">mdi-chevron-left</v-icon>
                <span>Back to Edit</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                large
                color="primary"
                @click="createandReviewButtonEventHandler"
                class="px-10 mr-3 font-weight-bold"
                data-test="btn-create-routing-slip"
              >
                <span>{{ createRoutingSlipLabel }}</span>
              </v-btn>
              <v-btn
                large
                outlined
                class="px-10 font-weight-bold"
                color="primary"
                @click="cancel"
                data-test="btn-cancel-create-routing-slip"
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
      max-height="310"
      :icon="modalDialogDetails.modalDialogIcon"
      :iconColor="isModalDialogInfo ? 'primary' : 'error'"
    >
      <template v-slot:actions>
        <v-btn large color="primary" @click="modalDialogClose()" data-test="dialog-ok-button" class="font-weight-bold btn-actions">{{ modalDialogDetails.modalDialogOkText }}</v-btn>
        <v-btn large color="primary" outlined @click="modalDialogCancel()" data-test="dialog-ok-button" class="ml-3 btn-actions" v-show="!isModalDialogInfo" >{{ modalDialogDetails.modalDialogCancelText }}</v-btn>
      </template>
    </ModalDialog>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateRoutingSlipDetails from '@/components/RoutingSlip/CreateRoutingSlipDetails.vue'
import CreateRoutingSlipPayment from '@/components/RoutingSlip/CreateRoutingSlipPayment.vue'
import ModalDialog from '@/components/common/ModalDialog.vue'
import { useCreateRoutingSlip } from '@/composables/RoutingSlip'
import ReviewRoutingSlip from '@/components/ReviewRoutingSlip/ReviewRoutingSlip.vue'

@Component({
  components: {
    CreateRoutingSlipPayment,
    CreateRoutingSlipDetails,
    ModalDialog,
    ReviewRoutingSlip
  },
  setup (_, context) {
    const {
      createRoutingSlipForm,
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
      isValid,
      createandReviewButtonEventHandler,
      backToEdit
    } = useCreateRoutingSlip(_, context)
    return {
      createRoutingSlipForm,
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
      isValid,
      createandReviewButtonEventHandler,
      backToEdit
    }
  }
})
export default class CreateRoutingSlip extends Vue {}
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
