<template>
  <transition-group name="slide-fade">
    <p
      key="text"
      class="mb-4"
      v-html="$t('linkRSSearchInfo')"
    />
    <div
      key="action"
      class="d-flex"
    >
      <v-autocomplete
        v-model="number"
        variant="filled"
        :items="autoCompleteRoutingSlips"
        :loading="isLoading"
        item-title="number"
        item-value="number"
        placeholder="Search by routing slip - Unique ID"
        return-object
        :rules="numberRules"
        :error-messages="errorMessage"
        append-icon=""
        @keyup="delayedSearch"
        @update:search="search = $event"
      >
        <template #no-data>
          <v-list-item>
            <v-list-item-title>
              <div class="mb-1 font-weight-bold">
                No matching routing slips found
              </div>
              <p class="mb-4">
                Try searching with a different routing slip unique ID
              </p>
            </v-list-item-title>
          </v-list-item>
        </template>

        <template #item="{ item }">
          <div class="rs-details">
            <span class="font-weight-bold">{{ item.raw.number }}</span>
            <span>
              <span>-</span>
              {{
                formatDisplayDate(item.raw.routingSlipDate, 'MMM DD, YYYY')
              }}</span>
            <span>
              <span>-</span> Current Balance:
              {{
                item.raw.remainingAmount
                  ? appendCurrencySymbol(item.raw.remainingAmount.toFixed(2))
                  : '$0.00'
              }}</span>
          </div>
        </template>
      </v-autocomplete>

      <v-btn
        size="large"
        color="primary"
        data-test="btn-link-rs"
        class="px-6 mx-2 font-weight-bold"
        @click="searchRS()"
      >
        <span class="font">Link </span>
      </v-btn>
      <v-btn
        size="large"
        variant="outlined"
        class="px-6 font-weight-bold"
        color="primary"
        data-test="btn-cancel-link"
        @click="toggleSearch()"
      >
        <span>Cancel</span>
      </v-btn>
    </div>
  </transition-group>
</template>
<script setup lang="ts">
import commonUtil from '@/util/common-util'
import { useRoutingSlipAutoComplete } from '@/composables/ViewRoutingSlip'

const emits = defineEmits(['toggleSearch'])

const {
  toggleSearch,
  number,
  numberRules,
  searchRS,
  errorMessage,
  autoCompleteRoutingSlips,
  isLoading,
  search,
  delayedSearch
} = useRoutingSlipAutoComplete(emits)

const formatDisplayDate = commonUtil.formatDisplayDate
const appendCurrencySymbol = commonUtil.appendCurrencySymbol
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
