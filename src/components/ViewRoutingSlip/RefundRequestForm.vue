<template>
  <v-form ref="refundRequestForm">
    <v-row>
      <v-col class="v-col-3 font-weight-bold pb-0">
        {{ 'Name of Person or Organization & Address' }}
      </v-col>
      <v-col class="v-col-9 pb-0">
        <v-text-field
          v-if="canEdit"
          v-model.trim="name"
          variant="filled"
          class="mb-4"
          label="Name of Person or Organization"
          persistent-hint
          data-test="txtName"
          :rules="nameRules"
        />
        <span v-else>{{ name }}</span>
        <AddressForm
          ref="addressForm"
          :editing="canEdit"
          :schema="baseAddressSchema"
          :address="address"
          @update-address="address=$event"
          @valid="addressValidity"
        />
      </v-col>
      <v-col
        class="v-col-3 font-weight-bold"
        :class="canEdit ? 'pt-0' : ''"
      >
        Cheque Advice
      </v-col>
      <v-col
        class="v-col-9"
        :class="canEdit ? 'pt-0' : ''"
      >
        <v-text-field
          v-if="isEditing"
          v-model.trim="chequeAdvice"
          variant="filled"
          label="Additional Information"
          persistent-hint
          data-test="txtChequeAdvice"
          :rules="chequeAdviceRules"
        />
        <span v-else>{{ chequeAdvice }}</span>
      </v-col>
    </v-row>
  </v-form>
</template>
<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import AddressForm from '@/components/common/AddressForm.vue'
import { AddressIF } from '@bcrs-shared-components/interfaces'
import CommonUtils from '@/util/common-util'
import { DefaultSchema } from '@bcrs-shared-components/base-address/resources'
import { RefundRequestDetails } from '@/models/RoutingSlip'

const props = defineProps<{
  inputRefundRequestDetails: RefundRequestDetails | null
  isEditing: boolean
  isApprovalFlow: boolean
}>()

const emits = defineEmits<{
  'update-refund-request-details': [refundRequestDetails: RefundRequestDetails]
}>()

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
  canEdit,
  isValid
} = useRefundRequestForm()

function useRefundRequestForm () {
  const inputRefundRequestDetails = toRef(props.inputRefundRequestDetails)
  const isApprovalFlow = toRef(props.isApprovalFlow)
  const isEditing = toRef(props.isEditing)

  const baseAddressSchema = ref<any>(DefaultSchema)
  const isAddressValid = ref<boolean>(false)

  const refundRequestForm = ref<HTMLFormElement>()
  const addressForm = ref<HTMLFormElement>()

  const nameRules = CommonUtils.requiredFieldRule()
  const chequeAdviceRules = CommonUtils.optionalFieldRule('This field should be maximum of 40 characters', 40)

  const name = ref<string>('')
  const address = ref<AddressIF>({} as AddressIF)
  const chequeAdvice = ref<string>('')

  const canEdit = computed(() => {
    // except "chequeAdvice" , all other field are not editable in approval process
    return !isApprovalFlow.value && isEditing.value
  })

  function addressValidity (isValid: boolean): void {
    isAddressValid.value = isValid
  }

  function isValid (): boolean {
    // Trigger both the form children validations
    // if the status is refund requested that means it is in approval flow where we need to check for only the chequeAdvice form validation
    if (isApprovalFlow.value && isEditing.value) {
      return refundRequestForm.value?.validate()
    }
    const nameValidate = refundRequestForm.value?.validate()
    return addressForm.value?.triggerValidate() && nameValidate && isAddressValid.value
  }

  // watch input elements name and address, and if anything changes, bubble up the values back to parent;
  watch([name, address, chequeAdvice], () => {
    const refundRequestDetails: RefundRequestDetails =
      { name: name.value, mailingAddress: address.value, chequeAdvice: chequeAdvice.value } as RefundRequestDetails
    emits('update-refund-request-details', refundRequestDetails)
  }, { deep: true })

  // watch property from parent and if there are any updates, pass on the values to address component
  watch(inputRefundRequestDetails, () => {
    if (inputRefundRequestDetails.value) {
      // convert to address format to component
      name.value = inputRefundRequestDetails.value?.name
      address.value = inputRefundRequestDetails.value?.mailingAddress
      chequeAdvice.value = inputRefundRequestDetails.value?.chequeAdvice
    }
  }, { deep: true, immediate: true })

  return {
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
  }
}

defineExpose({
  isValid
})
</script>
