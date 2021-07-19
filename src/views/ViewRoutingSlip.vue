<template>
  <v-container class="view-container">
    <v-row>
      <v-col cols="12">
        <header class="d-flex flex-column mb-0">
          <!-- Back Navigation -->
          <div class="py-0">
            <v-btn text large data-test="btn-back" color="primary" class="pl-0">
              <v-icon color="primary" class="mr-1">mdi-arrow-left</v-icon>
              <span>Back to Dashboard</span>
            </v-btn>
          </div>
          <h1 class="view-header__title pt-4">View Routing Slip</h1>
          <p>
            Review and verify details for this routing slip
          </p>
        </header>
      </v-col>

      <v-col cols="12">
        <print-routing-slip />
      </v-col>
      <v-col cols="12">
        <routing-slip-info />
      </v-col>
      <v-col cols="12">
        <payment-information />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PrintRoutingSlip, RoutingSlipInfo, PaymentInformation } from '@/components/ViewRoutingSlip'
import { useViewRoutingSlip } from '@/composables/ViewRoutingSlip'

@Component({
  components: {
    PrintRoutingSlip,
    RoutingSlipInfo,
    PaymentInformation
  },
  setup (props) {
    useViewRoutingSlip(props)
  }
})
export default class ViewRoutingSlip extends Vue {
  @Prop() slipId: string
}
</script>
