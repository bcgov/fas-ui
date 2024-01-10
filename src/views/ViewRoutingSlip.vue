<template>
  <div>
    <v-container class="view-container">
      <v-row>
        <v-col cols="12">
          <header class="d-flex flex-column mb-0">
            <template>
              <h1 class="view-header__title pt-4">
                View Routing Slip: {{ slipId }}
              </h1>
              <p>
                {{ $t('reviewRoutingSlipText') }}
              </p>
            </template>
          </header>
        </v-col>
        <v-col
          cols="12"
          class="mb-1 py-0 pl-0"
        >
          <staff-comments :routingSlipNumber="slipId" />
        </v-col>
        <v-col
          cols="12"
          class="mb-5"
        >
          <routing-slip-info />
        </v-col>
        <v-col
          cols="12"
          class="my-5"
        >
          <payment-information />
        </v-col>
        <v-col
          cols="12"
          class="my-5"
        >
          <link-routing-slip />
        </v-col>
        <v-col
          cols="12"
          class="my-5"
        >
          <routing-slip-transaction />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import {
  LinkRoutingSlip,
  PaymentInformation,
  RoutingSlipInfo,
  RoutingSlipTransaction, StaffComments
} from '@/components/ViewRoutingSlip'
import { useViewRoutingSlip } from '@/composables/ViewRoutingSlip'

const props = defineProps<{
  slipId: string
}>()
useViewRoutingSlip(props)
</script>
