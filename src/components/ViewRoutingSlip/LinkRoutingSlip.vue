<template>
  <div>
    <header class="d-flex flex-column mb-0">
      <h3 data-test="title">{{ tabNumber }}.Linking Routing Slip</h3>
      <p>{{ $t('linkRoutingSlipSubText') }}</p>
    </header>
    <v-card class="pl-5 py-2 small-text-input">
      <v-card-text>
        <v-row v-if="isRoutingSlipLinked">
          <v-col class="col-6 col-sm-8 font-weight-bold">
            This routing slip has been linked to:
          </v-col>
          <v-col cols="12" class="pb-0" v-if="!isRoutingSlipAChild">
            <linked-routing-slip-details
              data-test="linked-routing-slip-details"
              v-for="(routinSlip, i) in childRoutingSlipDetails"
              :siNumber="i + 1"
              :createdDate="routinSlip.createdOn"
              :routingSlipNumber="routinSlip.number"
              :key="routinSlip.number"
            />
          </v-col>
          <v-col cols="12" v-if="isRoutingSlipAChild" class="pb-0">
            <linked-routing-slip-details
              :createdDate="parentRoutingSlipDetails.createdOn"
              :routingSlipNumber="parentRoutingSlipDetails.number"
            />
          </v-col>
          <v-col cols="12" class="pl-0" v-if="isRoutingSlipAChild">
            <div class="linked-rs-info">
              <h4>Linked routing slip</h4>
              <p v-html="$t('linkedRSChildInfo')"></p>
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters v-if="!isRoutingSlipLinked">
          <v-col cols="12" sm="10">
            <v-row>
              <v-col class="col-6 col-sm-8 font-weight-bold">
                This routing slip has no linked routing slips
              </v-col>

              <v-col cols="6" sm="8" v-if="showSearch">
                <div class="d-flex" key="action">
                  <RoutingSlipAutoComplete data-test="routing-slip-auto-complete" @toggleSearch="toggleSearch()" />
                </div>
              </v-col>
            </v-row>
          </v-col>

          <v-col class="col-1 col-sm-2 d-flex justify-end pr-5">
            <v-btn
              large
              color="primary"
              data-test="btn-add-link-rs"
              v-can:fas_edit.hide
              :disabled="showSearch"
              @click="toggleSearch()"
              v-can:fas_link.hide
            >
              <v-icon class="mr-1">mdi-plus</v-icon>
              <span class="font">Link Routing Slip</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import commonUtil from '@/util/common-util'
import { useLinkRoutingSlip } from '@/composables/ViewRoutingSlip'
import can from '@/directives/can'
import LinkedRoutingSlipDetails from '@/components/ViewRoutingSlip/LinkedRoutingSlipDetails.vue'
import RoutingSlipAutoComplete from '@/components/ViewRoutingSlip/RoutingSlipAutoComplete.vue'
@Component({
  components: {
    LinkedRoutingSlipDetails,
    RoutingSlipAutoComplete
  },
  directives: {
    can
  },
  setup () {
    const {
      showSearch,
      toggleSearch,
      isRoutingSlipLinked,
      isRoutingSlipAChild,
      isLoading,
      childRoutingSlipDetails,
      parentRoutingSlipDetails
    } = useLinkRoutingSlip()

    return {
      showSearch,
      toggleSearch,
      isRoutingSlipLinked,
      isRoutingSlipAChild,
      isLoading,
      childRoutingSlipDetails,
      parentRoutingSlipDetails
    }
  }
})
export default class LinkRoutingSlip extends Vue {
  public formatDisplayDate = commonUtil.formatDisplayDate
  @Prop({ default: '03' }) private tabNumber
}
</script>

<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
.slip-status {
  text-transform: capitalize;
}
.row + .row {
  margin-top: 7px !important;
}
.status-list {
  max-width: 400px;
}
.linked-rs-info {
  background-color: #f1f3f5;
  padding: 13px 19px;
  border-left: 8px solid $bcgovBorderblue;
  border-radius: 6px;
}
</style>
