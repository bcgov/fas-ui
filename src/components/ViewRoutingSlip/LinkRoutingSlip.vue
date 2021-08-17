<template>
  <div>
    <header class="d-flex flex-column mb-0">
      <h3 data-test="title">{{ tabNumber }}.Linking Routing Slip</h3>
      <p>{{ $t('linkRoutingSlipSubText') }}</p>
    </header>
    <v-card class="pl-5 py-2 small-text-input">
      <v-card-text>
        <v-row v-if="alreadyLinked">
          <v-col class="col-6 col-sm-8 font-weight-bold">
            This routing slip has been linked to:
          </v-col>
          <v-col cols="12">
            <linked-routing-slip-details
              createdDate="May 05, 2021"
              RoutingSlipNumber="A3388999480"
            />
          </v-col>
          <v-col cols="12" v-if="isChildRS">
            <div class="linked-rs-info">
              <h4>Linked routing slip</h4>
              <p v-html="$t('linkedRSChildInfo')"></p>
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters v-if="!alreadyLinked">
          <v-col cols="12" sm="10">
            <v-row>
              <v-col class="col-6 col-sm-8 font-weight-bold">
                This routing slip has no linked routing slips
              </v-col>

              <v-col cols="6" sm="8" v-if="showSearch">
                <transition-group name="slide-fade">
                  <p key="text" v-html="$t('linkRSSearchInfo')"></p>
                  <div class="d-flex" key="action">
                    <v-text-field
                      filled
                      label="Search by routing slip - Unique ID"
                      persistent-hint
                      data-test="rs-id"
                      v-model.trim="number"
                      :rules="numberRules"
                      :error-messages="errorMessage"
                    >
                    </v-text-field>
                    <v-btn
                      large
                      color="primary"
                      data-test="btn-link-rs"
                      v-can:fas_edit.hide
                      class="mx-2 font-weight-bold"
                      @click="searchRS()"
                    >
                      <span class="font">Link </span>
                    </v-btn>
                    <v-btn
                      large
                      outlined
                      class="px-2 font-weight-bold"
                      color="primary"
                      @click="toggleSearch()"
                      data-test="btn-cancel-link"
                    >
                      <span>Cancel</span>
                    </v-btn>
                  </div>
                </transition-group>
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
import statusList from '@/components/common/StatusList.vue'
import can from '@/directives/can'
import LinkedRoutingSlipDetails from '@/components/ViewRoutingSlip/LinkedRoutingSlipDetails.vue'

@Component({
  components: {
    statusList,
    LinkedRoutingSlipDetails
  },
  directives: {
    can
  },
  setup (props) {
    const {
      showSearch,
      toggleSearch,
      number,
      numberRules,
      searchRS,
      errorMessage,
      alreadyLinked,
      isChildRS
    } = useLinkRoutingSlip(props)

    return {
      showSearch,
      toggleSearch,
      number,
      numberRules,
      searchRS,
      errorMessage,
      alreadyLinked,
      isChildRS
    }
  }
})
export default class LinkRoutingSlip extends Vue {
  public colors = commonUtil.statusListColor
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
