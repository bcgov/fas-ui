<template>
    <div class="d-flex justify-start">
        <v-col cols="2">
            <p class="text-center font-weight-bold mt-4">Routing slip</p>
        </v-col>
        <v-col cols="9" class="pl-0">
            <v-form ref="createRoutingSlipDetailsForm" class="mt-4">
                <v-row class="d-flex pa-0 ma-0 justify-between">
                    <!-- Routing Slip ID -->
                    <v-col cols="12" class="py-0">
                        <v-text-field
                        filled
                        label="Routing Slip - Unique ID"
                        req
                        persistent-hint
                        data-test="txtNumberId"
                        v-model.trim="number"
                        :rules="numberRules"
                        >
                        </v-text-field>
                    </v-col>
                    <!-- Routing Date -->
                    <v-col cols="6" class="py-0">
                        <v-text-field
                        filled
                        label="Routing Date"
                        req
                        persistent-hint
                        data-test="txtroutingSlipDate"
                        v-model="routingSlipDate"
                        :rules="routingSlipDateRules"
                        >
                        </v-text-field>
                    </v-col>
                    <!-- Name of person -->
                    <v-col cols="6" class="py-0">
                        <v-text-field
                        filled
                        label="Name of Person or Business Submitting (optional)"
                        req
                        persistent-hint
                        data-test="txtAccountName"
                        v-model.trim="accountName"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useCreateRoutingSlipDetails } from '@/composables/RoutingSlip/useCreateRoutingSlipDetails'

@Component({
  setup () {
    const {
      createRoutingSlipDetailsForm,
      number,
      routingSlipDate,
      accountName,
      numberRules,
      routingSlipDateRules,
      isValid,
      getRoutingSlipDetailsInput
    } = useCreateRoutingSlipDetails()
    return {
      createRoutingSlipDetailsForm,
      number,
      routingSlipDate,
      accountName,
      numberRules,
      routingSlipDateRules,
      isValid,
      getRoutingSlipDetailsInput
    }
  }
})
export default class CreateRoutingSlipDetails extends Vue {
}
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

    .text-center {
        text-align: center;
    }
</style>
