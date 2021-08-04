<template>
  <v-row>
    <v-col>
      <!-- <v-card class="pa-6">
        <h4>Search for Routing Slip</h4>
        <p class="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          porttitor sem.
        </p> -->
      <div class="header-bg-color d-flex align-center py-5 mb-0 mt-10">
        <v-icon color="primary" class="ml-5">
          mdi-view-list
        </v-icon>
        <p class="ml-2 mb-0 font-weight-bold">Recent Routing Slip</p>
      </div>
      <v-form>
        <v-row dense class="row-margin">
          <v-col sm="12" cols="12">
            <transition name="slide-fade">
              <v-data-table
                :headers="headerSearch"
                :items="routingSlipDetails"
                item-key="name"
                class="elevation-1"
                sort-by="routingSlipNumber"
                :sort-desc="[false, true]"
                hide-default-header
              >
                <!-- hide-default-header -->
                <template v-slot:header="{}">
                  <thead class="v-data-table-header">
                    <tr class="header-row-1">
                      <th
                        v-for="(header, i) in getDisplayedHeaders()"
                        :scope="i"
                        :key="'find-header-' + i"
                        class="text-start"
                      >
                        {{ header.text }}
                      </th>
                    </tr>
                  </thead>
                  <tr class="header-row-2 mt-2">
                    <th
                      v-for="(header, i) in getDisplayedHeaders()"
                      :key="'find-sub-header-' + i"
                      class="py-3 px-1"
                      :scope="i"
                    >
                      <v-text-field
                        v-if="header.value === 'routingSlipNumber'"
                        id="routingSlipNumber"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Routing Slip Number"
                        v-model="routingSlipNumber"
                      />

                      <v-text-field
                        v-if="header.value === 'receiptNumber'"
                        id="receiptNumber"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Receipt Number"
                        v-model="receiptNumber"
                      />
                      <DateRangeFilter
                        v-if="header.value === 'date'"
                        :dateFilterProp="searchDate"
                        @emitDateFilter="applyDateFilter($event)"
                      >
                      </DateRangeFilter>
                      <div class="mt-1">
                        <status-list
                          v-if="header.value === 'status'"
                          v-model="currentStatus"
                        ></status-list>
                      </div>

                      <v-text-field
                        v-if="header.value === 'folioNumber'"
                        id="folioNumber"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Folio Number"
                        v-model="folioNumber"
                      />

                      <v-text-field
                        v-if="header.value === 'initiator'"
                        id="initiator"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Initiator"
                        v-model="initiator"
                      />

                      <v-text-field
                        v-if="header.value === 'total'"
                        id="total"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Total Amount"
                        v-model="totalAmount"
                      />
                    </th>
                  </tr>
                </template>
              </v-data-table>
            </transition>
          </v-col>
        </v-row>
      </v-form>
      <!-- </v-card> -->
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useSearch } from '@/composables/Dashboard/useSearch'
import DateRangeFilter from '@/components/common/DateRangeFilter.vue'
import statusListComponent from '@/components/common/StatusList.vue'

@Component({
  setup () {
    const {
      headerSearch,
      getDisplayedHeaders,
      currentStatus,
      routingSlipNumber,
      receiptNumber,
      searchDate,
      folioNumber,
      initiator,
      totalAmount,
      routingSlipDetails,
      applyDateFilter
    } = useSearch()
    return {
      headerSearch,
      getDisplayedHeaders,
      currentStatus,
      routingSlipNumber,
      receiptNumber,
      searchDate,
      folioNumber,
      initiator,
      totalAmount,
      routingSlipDetails,
      applyDateFilter
    }
  },
  components: {
    DateRangeFilter,
    statusList: statusListComponent
  }
})
export default class Search extends Vue {}
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';

.button-search {
  display: flex;
  height: 62% !important;
  width: 100%;
}
.advanced-search {
  color: var(--v-primary-base) !important;
  font-size: 1rem;
  cursor: pointer;
}
.row-margin {
  margin: -5px !important;
}
.header-bg-color {
  background-color: $BCgovBlue0;
}

//@at-root
.text-input-style {
  height: 41px !important;
}
</style>

<style lang="scss">
.v-text-field--outlined > .v-input__control > .v-input__slot {
  // align-items: stretch;
  min-height: 41px !important;
}
</style>
