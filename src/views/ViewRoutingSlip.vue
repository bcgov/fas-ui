<template>
  <div>
    <v-container class="view-container">
      <v-row>
        <v-col cols="12">
          <header class="d-flex flex-column mb-0">
            <template>
              <h1 class="view-header__title pt-4">View Routing Slip: {{ slipId }}</h1>
              <p>
                {{ $t('reviewRoutingSlipText') }}
              </p>
            </template>
          </header>
        </v-col>
        <v-col cols="12" class="mb-1 py-0 pl-0">
          <StaffComments :routingSlipNumber="slipId" :key="commentsKey" />
        </v-col>
        <v-col cols="12" class="mb-5">
          <RoutingSlipInfo  @commentsUpdated="refreshComments" />
        </v-col>
        <v-col cols="12" class="my-5">
          <PaymentInformation />
        </v-col>
        <v-col cols="12" class="my-5">
          <LinkRoutingSlip />
        </v-col>
        <v-col cols="12" class="my-5">
          <RoutingSlipTransaction />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import {
  RoutingSlipInfo,
  PaymentInformation,
  RoutingSlipTransaction,
  LinkRoutingSlip, StaffComments
} from '@/components/ViewRoutingSlip'
import { useViewRoutingSlip } from '@/composables/ViewRoutingSlip'

export default defineComponent({
  name: 'ViewRoutingSlip',
  components: {
    RoutingSlipInfo,
    PaymentInformation,
    RoutingSlipTransaction,
    LinkRoutingSlip,
    StaffComments
  },
  props: {
    slipId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    useViewRoutingSlip(props)
    // Reactive key for forcing re-render
    const commentsKey = ref(0)
    const refreshComments = () => {
      commentsKey.value += 1
    }
    return {
      commentsKey,
      refreshComments
    }
  }
})
</script>
