<template>
  <div>
    <header class="d-flex flex-column mb-0">
      <h3 data-test="title">
        Linking Routing Slip
      </h3>
      <p class="mb-4">
        {{ $t('linkRoutingSlipSubText') }}
      </p>
    </header>
    <v-card class="pl-5 py-2 small-text-input">
      <v-card-text>
        <v-row v-if="isRoutingSlipLinked">
          <v-col class="v-col-6 v-col-sm-8 font-weight-bold">
            {{
              $t(
                isRoutingSlipAChild
                  ? 'linkRoutingSlipSearchTitleChild'
                  : 'linkRoutingSlipSearchTitleParent'
              )
            }}
          </v-col>
          <v-col
            v-if="!isRoutingSlipAChild"
            cols="12"
            class="pb-0"
          >
            <linked-routing-slip-details
              v-for="(routinSlip, i) in childRoutingSlipDetails"
              :key="routinSlip.number"
              data-test="linked-routing-slip-details"
              :siNumber="i + 1"
              :createdDate="routinSlip.createdOn"
              :routingSlipNumber="routinSlip.number"
              :parentRoutingSlipNumber="routingSlip.number"
            />
          </v-col>
          <v-col
            v-if="isRoutingSlipAChild"
            cols="12"
            class="pb-0"
          >
            <linked-routing-slip-details
              :createdDate="parentRoutingSlipDetails.createdOn"
              :routingSlipNumber="parentRoutingSlipDetails.number"
            />
          </v-col>
          <v-col
            v-if="isRoutingSlipAChild"
            cols="12"
            class="pl-0"
          >
            <div class="linked-rs-info">
              <h4 class="mb-3">
                Linked routing slip
              </h4>
              <p v-html="$t('linkedRSChildInfo')" />
            </div>
          </v-col>
        </v-row>
        <template v-if="!isRoutingSlipLinked">
          <v-row
            v-if="invoiceCount > 0 "
            no-gutters
            data-test="invoice-exist-error-msg"
          >
            <v-icon class="align-start">
              mdi-information-outline
            </v-icon>
            <p class="mb-0 ml-2">
              <span
                v-if="isRoutingSlipVoid"
                class="text-color"
                v-html="$t('cantLinkBecauseVoidedMsg')"
              />
              <span
                v-else
                class="text-color"
                v-html="$t('cantLinkSinceInvoicesExistMsg')"
              />
            </p>
          </v-row>
          <v-row
            v-else
            no-gutters
          >
            <v-col
              cols="12"
              sm="10"
            >
              <v-row data-test="search-link-header">
                <v-col
                  v-if="isRoutingSlipVoid"
                  class="v-col-6 v-col-sm-8 font-weight-bold mt-1"
                >
                  {{ $t('cantLinkBecauseVoidedMsg') }}
                </v-col>
                <v-col
                  v-else
                  class="v-col-6 v-col-sm-8 font-weight-bold mt-1"
                >
                  This routing slip has no linked routing slips
                </v-col>

                <v-col
                  v-if="showSearch"
                  cols="6"
                  sm="8"
                >
                  <div
                    key="action"
                  >
                    <RoutingSlipAutoComplete
                      data-test="routing-slip-auto-complete"
                      @toggleSearch="toggleSearch()"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-col>

            <v-col class="v-col-1 v-col-sm-2 d-flex justify-end pr-5">
              <v-btn
                v-can:fas_edit.hide
                v-can:fas_link.hide
                size="large"
                color="primary"
                data-test="btn-add-link-rs"
                :disabled="showSearch || isRoutingSlipVoid"
                @click="toggleSearch()"
              >
                <v-icon class="mr-1">
                  mdi-plus
                </v-icon>
                <span class="font">Link Routing Slip</span>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>
<script setup lang="ts">
import LinkedRoutingSlipDetails from '@/components/ViewRoutingSlip/LinkedRoutingSlipDetails.vue'
import RoutingSlipAutoComplete from '@/components/ViewRoutingSlip/RoutingSlipAutoComplete.vue'
import { useLinkRoutingSlip } from '@/composables/ViewRoutingSlip'
import { can as vCan } from '@/directives/can'

const {
  showSearch,
  toggleSearch,
  isRoutingSlipLinked,
  isRoutingSlipAChild,
  isRoutingSlipVoid,
  invoiceCount,
  childRoutingSlipDetails,
  parentRoutingSlipDetails,
  routingSlip
} = useLinkRoutingSlip()
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
.align-start {
  align-items: flex-start !important;
}
</style>
