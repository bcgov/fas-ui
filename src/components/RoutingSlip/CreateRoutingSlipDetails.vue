<template>
  <div class="d-flex justify-start">
    <v-col cols="2">
      <p
        data-test="title"
        class="text-center font-weight-bold mt-4 mb-4"
      >
        Routing slip
      </p>
    </v-col>
    <v-col
      cols="10"
      class="pl-0 pr-md-16"
    >
      <v-form
        ref="createRoutingSlipDetailsForm"
        class="mt-4"
      >
        <v-row class="d-flex pa-0 ma-0 justify-between">
          <v-col
            cols="12"
            class="py-0 mb-4"
          >
            <v-text-field
              v-model.trim="number"
              variant="filled"
              label="Routing Slip - Unique ID"
              persistent-hint
              data-test="txtNumberId"
              :rules="numberRules"
              :error-messages="errorMessage"
              @change="checkRoutingNumberAvailable"
            />
          </v-col>
          <v-col
            cols="6"
            class="py-0"
          >
            <date-picker
              v-model="routingSlipDate"
              :rules="routingSlipDateRules"
              data-test="txtRoutingSlipDate"
            />
          </v-col>
          <v-col
            cols="6"
            class="py-0"
          >
            <v-text-field
              v-model.trim="accountName"
              variant="filled"
              label="Entity Number"
              :rules="entityNumberRules"
              data-test="txtEntityNumber"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </div>
</template>

<script setup lang="ts">
import DatePicker from '@/components/common/DatePicker.vue'
import { useCreateRoutingSlipDetails } from '@/composables/RoutingSlip'

const {
  createRoutingSlipDetailsForm,
  number,
  routingSlipDate,
  accountName,
  numberRules,
  routingSlipDateRules,
  entityNumberRules,
  checkRoutingNumberAvailable,
  errorMessage
} = useCreateRoutingSlipDetails()

// TODO move to composable
const isValid = async () => (await createRoutingSlipDetailsForm.value.validate()).length === 0

defineExpose({
  isValid
})
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

.text-center {
  text-align: center;
}
</style>
