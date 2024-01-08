<template>
  <v-row v-if="routingSlipDetails">
    <v-col class="col-3 font-weight-bold">
      Routing Slip - Unique ID
    </v-col>
    <v-col class="col-9" data-test="txt-routing-slip-number">
      {{ routingSlipDetails.number }}
    </v-col>
    <v-col class="col-3 font-weight-bold">
      Date
    </v-col>
    <v-col class="col-9" data-test="txt-routing-slip-date">
      {{ routingSlipDetails.routingSlipDate ?
        formatDisplayDate(
          routingSlipDetails.routingSlipDate,
          'MMMM DD, YYYY'
        ) : '-'
      }}
    </v-col>
    <v-col class="col-3 font-weight-bold">
      Entity Number
    </v-col>
    <v-col class="col-9" data-test="txt-routing-slip-name">
      {{ accountInfo && accountInfo.accountName ? accountInfo.accountName : '-' }}
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { AccountInfo, RoutingSlipDetails } from '@/models/RoutingSlip'
import commonUtil from '@/util/common-util'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  routingSlipDetails: RoutingSlipDetails,
  accountInfo: AccountInfo
}>()

const formatDisplayDate = commonUtil.formatDisplayDate
</script>
