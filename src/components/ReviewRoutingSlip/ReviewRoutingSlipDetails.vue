<template>
  <v-row no-gutters class="mb-16" v-if="routingSlipDetails">
    <v-col class="col-12 col-sm-10 ">
      <v-row>
        <v-col class="col-6 col-sm-3 font-weight-bold">
          Routing Slip - Unique ID
        </v-col>
        <v-col class="col-6 col-sm-9" data-test="routingSlipNumber">
          {{ routingSlipDetails.number }}
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-6 col-sm-3 font-weight-bold">
          Date
        </v-col>
        <v-col class="col-6 col-sm-9" data-test="routingSlipDate">
          {{ routingSlipDetails.routingSlipDate ?
            formatDisplayDate(
              routingSlipDetails.routingSlipDate,
              'MMMM DD, YYYY'
            ) : '-'
          }}
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-6 col-sm-3 font-weight-bold">
          Name of Person Submitting
        </v-col>
        <v-col class="col-6 col-sm-9" v-if="accountInfo && accountInfo.accountName" data-test="accountName">
          {{ accountInfo.accountName }}
        </v-col>
        <v-col class="col-6 col-sm-9" v-else>
          -
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { AccountInfo, RoutingSlipDetails } from '@/models/RoutingSlip'
import commonUtil from '@/util/common-util'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class ReviewRoutingSlipDetails extends Vue {
  @Prop({ default: () => null }) routingSlipDetails: RoutingSlipDetails
  @Prop({ default: () => null }) accountInfo: AccountInfo

  public formatDisplayDate = commonUtil.formatDisplayDate
}
</script>
