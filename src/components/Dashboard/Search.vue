<template>
  <div class="fas-search">
    <v-row
      class="d-flex flex-row align-center"
      :class="isLibraryMode ? 'justify-end' : 'justify-space-between'"
      no-gutters
    >
      <v-col cols="4" v-if="!isLibraryMode">
        <v-btn
          class="font-weight-bold"
          large
          dark
          color="primary"
          @click="addRoutingSlip"
          v-can:fas_create.hide
        >
          <v-icon dark small class="mr-2 font-weight-bold">
            mdi-plus
          </v-icon>
          Add New Routing Slip
        </v-btn>
      </v-col>
      <v-col cols="3" align-self="center" v-if="isLibraryMode">
        <v-btn
          x-large
          dark
          outlined
          color="primary"
          @click="openFasWeb"
        >
          Access Fee Account System
          <v-icon dark small class="ml-2 font-weight-bold">
            mdi-open-in-new
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <search-column-filter-component v-model="headerSearch" hide-details>
        </search-column-filter-component>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <div class="header-bg-color d-flex align-center py-5 mb-0 rounded-t-lg">
          <v-icon color="primary" class="ml-5">
            mdi-view-list
          </v-icon>
          <h4 class="ml-2 mb-0 font-weight-bold">
            {{ isLibraryMode ? 'Recent Routing Slip' : 'Search Routing Slip' }}
          </h4>
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
                  hide-default-header
                  hide-default-footer
                  fixed-header
                  height="40rem"
                  :loading="isLoading"
                >
                  <template v-slot:no-data>
                    <div
                      class="py-8 no-data"
                      v-html="
                        $t(
                          !searchParamsExist
                            ? 'searchNoResult'
                            : 'searchStartMessage'
                        )
                      "
                    ></div>
                  </template>
                  <template v-slot:header="{}">
                    <thead class="v-data-table-header">
                      <tr class="header-row-1">
                        <th
                          v-for="(header, i) in displayedHeaderSearch"
                          :scope="i"
                          :key="'find-header-' + i"
                          :class="
                            header.value !== '' ? 'text-start' : 'text-end'
                          "
                          class="font-weight-bold"
                        >
                          {{ header.text }}
                        </th>
                      </tr>
                    </thead>
                    <tr class="header-row-2 mt-2 px-2">
                      <th
                        scope="routingSlipNumber"
                        v-if="canShowColumn('routingSlipNumber')"
                      >
                        <!-- canShowColumn {{canShowColumn('routingSlipNumber')}} -->
                        <v-text-field
                          id="routingSlipNumber"
                          autocomplete="off"
                          class="text-input-style "
                          filled
                          placeholder="Routing Slip Number"
                          v-model.trim="routingSlipNumber"
                          @change="searchNow()"
                          dense
                          hide-details="auto"
                        />
                      </th>

                      <th
                        scope="receiptNumber"
                        v-if="canShowColumn('receiptNumber')"
                      >
                        <v-text-field
                          id="receiptNumber"
                          autocomplete="off"
                          class="text-input-style "
                          filled
                          placeholder="Receipt Number"
                          v-model.trim="receiptNumber"
                          @change="searchNow()"
                          hide-details="auto"
                        />
                      </th>
                      <th scope="date" v-if="canShowColumn('date')">
                        <date-range-filter
                          class="text-input-style"
                          v-model="dateFilter"
                          @applied="searchNow()"
                          hide-details="auto"
                          placeholder="Date"
                        >
                        </date-range-filter>
                      </th>
                      <th scope="status" v-if="canShowColumn('status')">
                        <div class="mt-1">
                          <status-list
                            class="text-input-style "
                            v-model="status"
                            @change="searchNow()"
                            hide-details="auto"
                            placeholder="Status"
                          ></status-list>
                        </div>
                      </th>
                      <th
                        scope="folioNumber"
                        v-if="canShowColumn('folioNumber')"
                      >
                        <v-text-field
                          id="folioNumber"
                          autocomplete="off"
                          class="text-input-style "
                          filled
                          placeholder="Folio Number"
                          v-model="folioNumber"
                          @change="searchNow()"
                          hide-details="auto"
                        />
                      </th>
                      <th scope="initiator" v-if="canShowColumn('initiator')">
                        <v-text-field
                          id="initiator"
                          autocomplete="off"
                          class="text-input-style "
                          filled
                          placeholder="Initiator"
                          v-model.trim="initiator"
                          @change="searchNow()"
                          hide-details="auto"
                        />
                      </th>
                      <th scope="total" v-if="canShowColumn('total')">
                        <v-text-field
                          id="total"
                          autocomplete="off"
                          class="text-input-style "
                          filled
                          placeholder="Total Amount"
                          v-model.trim="totalAmount"
                          @change="searchNow()"
                          hide-details="auto"
                        />
                      </th>
                      <th class="action" scope="action">
                        <span
                          class="clear-filter primary--text cursor-pointer"
                          v-if="!searchParamsExist"
                          @click="clearFilter"
                          >Clear Filters<v-icon small color="primary"
                            >mdi-close</v-icon
                          ></span
                        >
                      </th>
                    </tr>
                  </template>

                  <template v-slot:item="{ item }">
                    <transition name="slide-fade">
                      <tr v-if="!isLoading" class="rs-search-result">
                        <td v-if="canShowColumn('routingSlipNumber')">
                          {{ item.number ? item.number : '-' }}
                        </td>
                        <td v-if="canShowColumn('receiptNumber')">
                          <!-- if cash show number else - -->
                          {{
                            item.paymentAccount &&
                            item.paymentAccount.paymentMethod === 'CASH'
                              ? item.payments &&
                                item.payments[0] &&
                                item.payments[0].chequeReceiptNumber
                              : '-'
                          }}
                        </td>
                        <td v-if="canShowColumn('date')">
                          {{
                            item.routingSlipDate
                              ? formatDisplayDate(
                                  item.routingSlipDate,
                                  'MMMM DD, YYYY'
                                )
                              : '-'
                          }}
                        </td>
                        <td v-if="canShowColumn('status')">
                          <span
                            :class="colors(item.status)"
                            class="font-weight-bold"
                            data-test="label-status"
                            >{{
                              getStatusLabel(item.status)
                                ? getStatusLabel(item.status)
                                : '-'
                            }}</span
                          >
                        </td>
                        <td v-if="canShowColumn('folioNumber')">
                          <span
                            v-if="
                              formatFolioResult(item).length > 0 &&
                                !showExpandedFolio.includes(item.id)
                            "
                            @click="toggleFolio(item.id)"
                            class="cursor-pointer"
                          >
                            {{ formatFolioResult(item)[0] }}
                            <v-icon
                              small
                              v-if="formatFolioResult(item).length > 1"
                              color="primary"
                            >
                              mdi-menu-down</v-icon
                            ></span
                          >
                          <template v-if="showExpandedFolio.includes(item.id)">
                            <div
                              v-for="(folio, index) in formatFolioResult(item)"
                              :key="index"
                              @click="index === 0 ? toggleFolio(item.id) : ''"
                              :class="index === 0 ? 'cursor-pointer' : ''"
                            >
                              <span>
                                {{ folio }}
                                <v-icon
                                  small
                                  v-if="index === 0"
                                  color="primary"
                                >
                                  mdi-menu-up</v-icon
                                ></span
                              >
                            </div>
                          </template>
                        </td>
                        <td v-if="canShowColumn('initiator')">
                          {{ item.createdName ? item.createdName : '-' }}
                        </td>
                        <td v-if="canShowColumn('total')" class="text-right">
                          <span class="font-weight-bold text-end">
                            {{
                              item.total
                                ? appendCurrencySymbol(item.total.toFixed(2))
                                : '-'
                            }}
                          </span>
                        </td>
                        <td>
                          <v-btn
                            color="primary"
                            class=""
                            @click="navigateTo(item.number)"
                          >
                            Open
                          </v-btn>
                        </td>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { useSearch } from '@/composables/Dashboard/useSearch'
import DateRangeFilter from '@/components/common/DateRangeFilter.vue'
import SearchColumnFilterComponent from '@/components/common/SearchColumnFilterComponent.vue'
import statusListComponent from '@/components/common/StatusList.vue'

import commonUtil from '@/util/common-util'
import { useDashboard } from '@/composables/Dashboard'
import can from '@/directives/can'

@Component({
  setup (props, context) {
    const { addRoutingSlip } = useDashboard(props, context)
    const {
      headerSearch,
      displayedHeaderSearch,
      status,
      routingSlipNumber,
      receiptNumber,
      dateFilter,
      folioNumber,
      initiator,
      totalAmount,
      searchRoutingSlipResult,
      applyDateFilter,
      searchNow,
      canShowColumn,
      getStatusLabel,
      searchParamsExist,
      clearFilter,
      formatFolioResult,
      showExpandedFolio,
      toggleFolio,
      isLoading,
      navigateTo,
      openFasWeb
    } = useSearch(props, context)
    return {
      headerSearch,
      displayedHeaderSearch,
      status,
      routingSlipNumber,
      receiptNumber,
      dateFilter,
      folioNumber,
      initiator,
      totalAmount,
      searchRoutingSlipResult,
      applyDateFilter,
      searchNow,
      canShowColumn,
      getStatusLabel,
      addRoutingSlip,
      searchParamsExist,
      clearFilter,
      formatFolioResult,
      showExpandedFolio,
      toggleFolio,
      isLoading,
      navigateTo,
      openFasWeb
    }
  },
  components: {
    DateRangeFilter,
    SearchColumnFilterComponent,
    statusList: statusListComponent
  },
  directives: {
    can
  }
})
export default class Search extends Vue {
  public colors = commonUtil.statusListColor
  public appendCurrencySymbol = commonUtil.appendCurrencySymbol
  public formatDisplayDate = commonUtil.formatDisplayDate

  @Prop({ default: () => false }) isLibraryMode: boolean
}
</script>

<style lang="scss">
@import '$assets/scss/theme.scss';
@import '$assets/scss/search.scss';
</style>
