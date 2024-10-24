<template>
  <v-form ref="refundRequestForm">
    <v-row>
      <v-col
        data-test="rsDetail"
        class="col-3 font-weight-bold pb-0"
        v-if="canEdit || name"
      >
        {{ 'Client Name' }}
      </v-col>
      <v-col class="col-9 pb-0">
        <v-text-field
        filled
        label="Name of Person or Organization"
        persistent-hint
        v-model.trim="name"
        data-test="txtName"
        :rules="nameRules"
        v-if="canEdit"
        >
        </v-text-field>
        <span v-else>{{ name }}</span>
      </v-col>
      <v-col
        data-test="rsDetail"
        class="col-3 font-weight-bold pb-0"
        v-if="canEdit || address"
      >
        {{ 'Address' }}
      </v-col>
      <v-col class="col-9 pb-0">
        <AddressForm
          ref="addressForm"
          :editing="canEdit"
          :schema="baseAddressSchema"
          :address="address"
          @update:address="address=$event"
          @valid="addressValidity"
        >
        </AddressForm>
      </v-col>
      <v-col class="col-12">
      <v-divider v-if="!canEdit" class="mb-1 mt-2" />
      </v-col>
      <v-col
        class="col-3 font-weight-bold pt-0 pb-0"
        v-if="!canEdit"
      >
        Refund Status
      </v-col>
      <v-col
        class="col-9 pt-0"
        v-if="!canEdit"
      >
        <v-chip
          small
          label
          class="item-chip"
          :color="currentRefundStatus === RoutingSlipRefundCodes.CHEQUE_UNDELIVERABLE ? 'error' : 'default'"
        >
          {{ currentRefundStatusLabel }}
        </v-chip>
        <v-menu
          close-on-content-click
          offset-y
          v-model="isExpanded"
          v-if="!canEdit && currentRefundStatusLabel !== RoutingSlipRefundCodes.PROCESSING"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              text
              v-bind="attrs"
              v-on="on"
              small
              class="hover-btn ml-2"
              @click="expendStatus"
            >
              Update Status
              <v-icon dense>{{ isExpanded ? 'mdi-menu-up' : 'mdi-menu-down' }}</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="status in RoutingSlipRefundStatus.filter(s => s.code !== currentRefundStatus && s.display)"
                :key="status.code"
                @click="updateRefundStatus(status.code)"
              >
              <v-list-item-title>{{ status.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-col
        class="col-3 font-weight-bold"
        :class="canEdit ? 'pt-0' : ''"
        v-if="isEditing || chequeAdvice"
      >
        Cheque Advice
      </v-col>
      <v-col
        class="col-9"
        :class="canEdit ? 'pt-0' : ''">
        <v-text-field
          filled
          label="Additional Information"
          persistent-hint
          v-model.trim="chequeAdvice"
          data-test="txtChequeAdvice"
          :rules="chequeAdviceRules"
          maxLength=40
          placeholder="There is a 40 character limit. Include the entity name, entity number and what the refund is for."
          v-if="isEditing"
        >
        </v-text-field>
        <span v-else>{{ chequeAdvice }}</span>
      </v-col>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { useRefundRequestForm, useRoutingSlipInfo } from '@/composables/ViewRoutingSlip'
import AddressForm from '@/components/common/AddressForm.vue'
import { GetRoutingSlipRequestPayload, RefundRequestDetails } from '@/models/RoutingSlip'
import { RoutingSlipRefundCodes, RoutingSlipRefundStatus } from '@/util/constants'
import { useRoutingSlip } from '@/composables/useRoutingSlip'
import { useSearch } from '@/composables/Dashboard/useSearch'

export default defineComponent({
  components: {
    AddressForm
  },
  props: {
    inputRefundRequestDetails: {
      type: Object as () => RefundRequestDetails,
      default: () => null
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    isApprovalFlow: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const {
      baseAddressSchema,
      refundRequestForm,
      nameRules,
      chequeAdviceRules,
      name,
      chequeAdvice,
      address,
      addressForm,
      addressValidity,
      isValid,
      canEdit
    } = useRefundRequestForm(props, context)

    const { getRefundStatusText } = useSearch(props, context)

    const { routingSlipDetails } = useRoutingSlipInfo(props)
    const { updateRoutingSlipRefundStatus, updateRoutingSlipComments, getRoutingSlip, routingSlip } = useRoutingSlip()

    const currentRefundStatus = ref(routingSlipDetails.value?.refundStatus)
    const currentRefundStatusLabel = computed(() => getRefundStatusText(currentRefundStatus.value))

    const isExpanded = ref(false)

    const expendStatus = () => {
      isExpanded.value = !isExpanded.value
    }

    async function updateRefundStatus (status: string) {
      await updateRoutingSlipRefundStatus(status)
      const comment = `Refund status updated from ${getRefundStatusText(currentRefundStatus?.value)} to ${getRefundStatusText(status)}`
      await updateRoutingSlipComments(comment)
      currentRefundStatus.value = status
      if (routingSlip.value?.number) {
        const getRoutingSlipRequestPayload: GetRoutingSlipRequestPayload = { routingSlipNumber: routingSlip.value?.number }
        await getRoutingSlip(getRoutingSlipRequestPayload)
      }
    }

    return {
      baseAddressSchema,
      refundRequestForm,
      nameRules,
      chequeAdviceRules,
      currentRefundStatus,
      name,
      chequeAdvice,
      address,
      addressForm,
      addressValidity,
      isValid,
      canEdit,
      updateRefundStatus,
      expendStatus,
      isExpanded,
      RoutingSlipRefundStatus,
      getRefundStatusText,
      updateRoutingSlipComments,
      currentRefundStatusLabel,
      RoutingSlipRefundCodes
    }
  }
})
</script>

<style lang="scss" scoped>
.hover-btn:before {
  background-color: transparent !important;
}
</style>
