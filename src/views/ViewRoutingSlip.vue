<template>
  <div>
    <bread-crumb/>
    <v-container class="view-container">
      <v-row>
        <v-col cols="12">
          <header class="d-flex flex-column mb-0">
            <template>
              <h1 class="view-header__title pt-4">View Routing Slip: {{ slipId }}</h1>
              <p>
                Review and verify details for this routing slip
              </p>
            </template>
          </header>
        </v-col>

        <v-col cols="12" class="mb-5">
          <routing-slip-info />
        </v-col>
        <v-col cols="12" class="my-5">
          <payment-information />
        </v-col>
        <v-col cols="12" class="my-5">
          <link-routing-slip />
        </v-col>
        <v-col cols="12" class="my-5">
          <routing-slip-transaction />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import {
  RoutingSlipInfo,
  PaymentInformation,
  RoutingSlipTransaction,
  LinkRoutingSlip
} from '@/components/ViewRoutingSlip'
import BreadCrumb from '@/components/common/BreadCrumb.vue'
import { useViewRoutingSlip } from '@/composables/ViewRoutingSlip'

@Component({
  components: {
    RoutingSlipInfo,
    PaymentInformation,
    RoutingSlipTransaction,
    LinkRoutingSlip,
    BreadCrumb
  },
  setup (props) {
    useViewRoutingSlip(props)
  }
})
export default class ViewRoutingSlip extends Vue {
  @Prop() slipId: string
}
</script>
