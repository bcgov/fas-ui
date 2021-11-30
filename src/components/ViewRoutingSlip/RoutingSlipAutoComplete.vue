<template>
  <transition-group name="slide-fade">
    <p key="text" v-html="$t('linkRSSearchInfo')"></p>
    <div class="d-flex" key="action">
      <v-autocomplete
        filled
        v-model="number"
        :items="autoCompleteRoutingSlips"
        :loading="isLoading"
        :search-input.sync="search"
        @keyup="delayedSearch"
        :hide-no-data="hideNoData"
        item-text="number"
        item-value="number"
        placeholder="Search by routing slip - Unique ID"
        return-object
        :rules="numberRules"
        :error-messages="errorMessage"
        append-icon=""
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              <div class="mb-1 font-weight-bold">
                No matching routing slips found
              </div>
              <p>
                Try searching with a different routing slip unique ID
              </p>
            </v-list-item-title>
          </v-list-item>
        </template>

        <template v-slot:item="{ item }">
          <div class="rs-details">
            <span class="font-weight-bold">{{ item.number }}</span>
            <span>
              <span>-</span>
              {{
                formatDisplayDate(item.routingSlipDate, 'MMM DD, YYYY')
              }}</span
            >
            <span>
              <span>-</span> Current Balance:
              {{
                item.remainingAmount
                  ? appendCurrencySymbol(item.remainingAmount.toFixed(2))
                  : '$0.00'
              }}</span
            >
          </div>
        </template>
      </v-autocomplete>

      <v-btn
        large
        color="primary"
        data-test="btn-link-rs"
        class="px-6 mx-2 font-weight-bold"
        @click="searchRS()"
      >
        <span class="font">Link </span>
      </v-btn>
      <v-btn
        large
        outlined
        class="px-6 font-weight-bold"
        color="primary"
        @click="toggleSearch()"
        data-test="btn-cancel-link"
      >
        <span>Cancel</span>
      </v-btn>
    </div>
  </transition-group>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import commonUtil from '@/util/common-util'
import { useRoutingSlipAutoComplete } from '@/composables/ViewRoutingSlip'

@Component({
  setup (_, context) {
    const {
      toggleSearch,
      number,
      numberRules,
      searchRS,
      errorMessage,
      autoCompleteRoutingSlips,
      isLoading,
      search,
      hideNoData,
      delayedSearch
    } = useRoutingSlipAutoComplete(_, context)

    return {
      toggleSearch,
      number,
      numberRules,
      searchRS,
      errorMessage,
      autoCompleteRoutingSlips,
      isLoading,
      search,
      hideNoData,
      delayedSearch
    }
  }
})
export default class RoutingSlipAutoComplete extends Vue {
  public formatDisplayDate = commonUtil.formatDisplayDate
  public appendCurrencySymbol = commonUtil.appendCurrencySymbol
}
</script>

<style lang="scss" scoped>
.rs-details {
  display: flex;
  span {
    min-width: 118px;

    span {
      padding: 0 5px !important;
    }
  }
}
.row + .row {
  margin-top: 7px !important;
}
</style>
