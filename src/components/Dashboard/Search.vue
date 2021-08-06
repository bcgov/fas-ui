<template>
  <v-row>
    <v-col>
      <div class="header-bg-color d-flex align-center py-5 mb-0 mt-10">
        <v-icon color="primary" class="ml-5">
          mdi-view-list
        </v-icon>
        <h4 class="ml-2 mb-0 font-weight-bold">Recent Routing Slip</h4>
      </div>
      <v-form>
        <v-row dense class="row-margin">
          <v-col sm="12" cols="12">
            <transition name="slide-fade">
              <v-data-table
                :headers="headerSearch"
                :items="searchRoutingSlipResult"
                item-key="name"
                class="elevation-1"
                sort-by="routingSlipNumber"
                :sort-desc="[false, true]"
                hide-default-header
                fixed-header
                height="20rem"
              >
                <template v-slot:header="{}">
                  <thead class="v-data-table-header">
                    <tr class="header-row-1">
                      <th
                        v-for="(header, i) in headerToShow"
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
                      scope="routingSlipNumber"
                      v-if="canShowColum('routingSlipNumber')"
                    >
                      <!-- canShowColum {{canShowColum('routingSlipNumber')}} -->
                      <v-text-field
                        id="routingSlipNumber"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Routing Slip Number"
                        v-model="routingSlipNumber"
                        @change="searchNow()"
                        dense
                        hide-details="auto"
                      />
                    </th>

                    <th
                      scope="receiptNumber"
                      v-if="canShowColum('receiptNumber')"
                    >
                      <v-text-field
                        id="receiptNumber"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Receipt Number"
                        v-model="receiptNumber"
                        @change="searchNow()"
                        hide-details="auto"
                      />
                    </th>
                    <th scope="date" v-if="canShowColum('date')">
                      <date-range-filter
                        class="text-input-style"
                        v-model="searchDate"
                        @change="searchNow()"
                        hide-details="auto"
                      >
                      </date-range-filter>
                    </th>
                    <th scope="status" v-if="canShowColum('status')">
                      <div class="mt-1">
                        <status-list
                          class="text-input-style "
                          v-model="currentStatus"
                          @change="searchNow()"
                          hide-details="auto"
                        ></status-list>
                      </div>
                    </th>
                    <th scope="folioNumber" v-if="canShowColum('folioNumber')">
                      <v-text-field
                        id="folioNumber"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Folio Number"
                        v-model="folioNumber"
                        @change="searchNow()"
                        hide-details="auto"
                      />
                    </th>
                    <th scope="initiator" v-if="canShowColum('initiator')">
                      <v-text-field
                        id="initiator"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Initiator"
                        v-model="initiator"
                        @change="searchNow()"
                        hide-details="auto"
                      />
                    </th>
                    <th scope="total" v-if="canShowColum('total')">
                      <v-text-field
                        id="total"
                        autocomplete="off"
                        class="text-input-style "
                        filled
                        label="Total Amount"
                        v-model="totalAmount"
                        @change="searchNow()"
                        hide-details="auto"
                      />
                    </th>
                    <th></th>
                  </tr>
                </template>

                <template v-slot:item="{ item }">
                  <transition name="slide-fade">
                    <tr>
                      <td v-if="canShowColum('routingSlipNumber')">
                        {{ item.number }}
                      </td>
                      <td v-if="canShowColum('receiptNumber')">
                        routingSlipNumber
                      </td>
                      <td v-if="canShowColum('date')">
                        {{ item.routingSlipDate }}
                      </td>
                      <td v-if="canShowColum('status')">
                        {{ item.status }}
                      </td>
                      <td v-if="canShowColum('folioNumber')">
                        folio
                      </td>
                      <td v-if="canShowColum('initiator')">
                        {{ item.paymentAccount && item.paymentAccount.name }}
                      </td>
                      <td v-if="canShowColum('total')">
                        {{ item.total }}
                      </td>
                      <td></td>
                    </tr>
                  </transition>
                </template>
              </v-data-table>
            </transition>
          </v-col>
        </v-row>
      </v-form>
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
      headerToShow,
      currentStatus,
      routingSlipNumber,
      receiptNumber,
      searchDate,
      folioNumber,
      initiator,
      totalAmount,
      searchRoutingSlipResult,
      applyDateFilter,
      headerToDisplay,
      searchNow,
      canShowColum
    } = useSearch()
    return {
      headerSearch,
      headerToShow,
      currentStatus,
      routingSlipNumber,
      receiptNumber,
      searchDate,
      folioNumber,
      initiator,
      totalAmount,
      searchRoutingSlipResult,
      applyDateFilter,
      headerToDisplay,
      searchNow,
      canShowColum
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
// .text-input-style {
//   height: 41px !important;
// }
</style>

<style lang="scss">
.v-text-field--outlined > .v-input__control > .v-input__slot {
  // align-items: stretch;
  min-height: 41px !important;
}
.header-row-2 {
  th {
    padding: 4px 3px 10px 3px;
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
  }
  .v-label,
  .v-input {
    font-size: 12px;
  }
}
</style>
