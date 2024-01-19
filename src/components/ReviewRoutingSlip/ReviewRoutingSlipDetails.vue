<template>
  <v-row v-if="routingSlipDetails">
    <v-col class="v-col-3 font-weight-bold">
      Routing Slip - Unique ID
    </v-col>
    <v-col
      class="v-col-9"
      data-test="txt-routing-slip-number"
    >
      {{ routingSlipDetails.number }}
    </v-col>
    <v-col class="v-col-3 font-weight-bold">
      Date
    </v-col>
    <v-col
      class="v-col-9"
      data-test="txt-routing-slip-date"
    >
      {{ routingSlipDetails.routingSlipDate ?
        formatDisplayDate(
          routingSlipDetails.routingSlipDate,
          'DDD'
        ) : '-'
      }}
    </v-col>
    <v-col class="v-col-3 font-weight-bold">
      Entity Number
    </v-col>
    <v-col
      class="v-col-9"
      data-test="txt-routing-slip-name"
    >
      {{ accountInfo && accountInfo.accountName ? accountInfo.accountName : '-' }}
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { AccountInfo, RoutingSlipDetails } from '@/models/RoutingSlip'
import { formatDisplayDate } from '@/util'

defineProps<{
  routingSlipDetails: RoutingSlipDetails,
  accountInfo: AccountInfo
}>()
</script>
