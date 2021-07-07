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
                        data-test="txtRoutingSlipId"
                        v-model="routingSlipId"
                        >
                        </v-text-field>
                    </v-col>
                    <!-- Routing Date -->
                    <v-col cols="6" class="py-0">
                        <v-text-field
                        filled
                        label="Routing Slip - Unique ID"
                        req
                        persistent-hint
                        data-test="txtRoutingSlipId"
                        v-model="routingDate"
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
                        data-test="txtRoutingSlipPersonName"
                        v-model="routingSlipPersonName"
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
      routingSlipId,
      routingDate,
      routingSlipPersonName
    } = useCreateRoutingSlipDetails()
    return {
      createRoutingSlipDetailsForm,
      routingSlipId,
      routingDate,
      routingSlipPersonName
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
