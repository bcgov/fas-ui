<template>
  <div class="fas-search">
    <v-row
      class="d-flex flex-row align-center"
      :class="isLibraryMode ? 'justify-end' : 'justify-space-between'"
      no-gutters
    >
      <v-col
        v-if="!isLibraryMode"
        sm="4"
        cols="12"
      >
        <v-btn
          v-can:fas_create.hide
          class="font-weight-bold"
          size="large"
          color="primary"
          @click="addRoutingSlip"
        >
          <v-icon
            dark
            size="small"
            class="mr-2 font-weight-bold"
          >
            mdi-plus
          </v-icon>
          Add New Routing Slip
        </v-btn>
      </v-col>
      <v-col
        v-if="isLibraryMode"
        sm="3"
        cols="12"
        align-self="center"
      >
        <v-btn
          size="x-large"
          variant="outlined"
          color="primary"
          :href="fasUrl"
        >
          Access Fee Accounting System
          <v-icon
            dark
            size="small"
            class="ml-2 font-weight-bold"
          >
            mdi-open-in-new
          </v-icon>
        </v-btn>
      </v-col>
      <v-col
        sm="2"
        cols="12"
      >
        <search-column-filter-component
          v-model="headerSearch"
          hide-details
        />
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <div class="header-bg-color d-flex align-center py-5 mb-0 rounded-t-lg">
          <v-icon
            color="primary"
            class="ml-5"
          >
            mdi-view-list
          </v-icon>
          <h4 class="ml-2 mb-0 font-weight-bold">
            {{ isLibraryMode ? 'Recent Routing Slip' : 'Search Routing Slip' }}
          </h4>
        </div>
        <v-form>
          <v-row
            dense
            class="row-margin"
          >
            <v-col
              sm="12"
              cols="12"
            >
              <transition name="slide-fade">
                <v-data-table
                  :headers="displayedHeaderSearch"
                  :items="searchRoutingSlipResult"
                  item-key="name"
                  :sort-by="['routingSlipNumber']"
                  hide-default-header
                  hide-default-footer
                  fixed-header
                  height="40rem"
                  :loading="isLoading"
                  disable-pagination
                  :mobile-breakpoint="0"
                  :items-per-page="0"
                >
                  <template #no-data>
                    <div
                      class="py-8 no-data"
                      v-html="
                        $t(
                          !searchParamsExist
                            ? 'searchNoResult'
                            : 'searchStartMessage'
                        )
                      "
                    />
                  </template>
                  <template #headers="{ columns }">
                    <tr class="header-row-1">
                      <template
                        v-for="(header, i) in columns"
                        :key="header+'row-1'"
                      >
                        <th
                          :class="[
                            header.key !== '' ? 'text-start' : 'text-end',
                            header.className && `header-${header.className}`
                          ]"
                          class="font-weight-bold"
                        >
                          {{ header.title }}
                        </th>
                      </template>
                    </tr>
                    <tr class="header-row-2 mt-2 px-2">
                      <th
                        v-if="canShowColumn('routingSlipNumber')"
                        scope="routingSlipNumber"
                      >
                        <v-text-field
                          id="routingSlipNumber"
                          v-model.trim="routingSlipNumber"
                          autocomplete="off"
                          class="text-input-style "
                          variant="filled"
                          placeholder="Routing Slip Number"
                          density="compact"
                          hide-details="auto"
                          @update:model-value="debouncedSearch()"
                        />
                      </th>

                      <th
                        v-if="canShowColumn('receiptNumber')"
                        scope="receiptNumber"
                      >
                        <v-text-field
                          id="receiptNumber"
                          v-model.trim="receiptNumber"
                          autocomplete="off"
                          class="text-input-style "
                          variant="filled"
                          placeholder="Receipt Number"
                          density="compact"
                          hide-details="auto"
                          @update:model-value="debouncedSearch()"
                        />
                      </th>
                      <th
                        v-if="canShowColumn('accountName')"
                        scope="accountName"
                      >
                        <v-text-field
                          id="accountName"
                          v-model.trim="accountName"
                          autocomplete="off"
                          class="text-input-style "
                          variant="filled"
                          placeholder="Entity Number"
                          density="compact"
                          hide-details="auto"
                          @update:model-value="debouncedSearch()"
                        />
                      </th>
                      <th
                        v-if="canShowColumn('createdName')"
                        scope="createdName"
                      >
                        <v-text-field
                          id="createdName"
                          v-model.trim="initiator"
                          autocomplete="off"
                          class="text-input-style "
                          variant="filled"
                          placeholder="Created By"
                          density="compact"
                          hide-details="auto"
                          @update:model-value="debouncedSearch()"
                        />
                      </th>
                      <th
                        v-if="canShowColumn('date')"
                        scope="date"
                      >
                        <date-range-filter
                          id="date"
                          v-model="dateFilter"
                          class="text-input-style"
                          hide-details="auto"
                          placeholder="Date"
                          label="Date"
                          density="compact"
                          @applied="handleDateFilterApplied"
                        />
                      </th>
                      <th
                        v-if="canShowColumn('status')"
                        scope="status"
                      >
                        <div class="mt-0">
                          <status-list
                            id="status"
                            v-model="status"
                            class="text-input-style "
                            hide-details="auto"
                            density="compact"
                            :placeholder="!status ? 'Status' : ''"
                            @update:model-value="searchNow()"
                          />
                        </div>
                      </th>
                      <th
                        v-if="canShowColumn('businessIdentifier')"
                        scope="businessIdentifier"
                      >
                        <v-text-field
                          id="businessIdentifier"
                          v-model.trim="businessIdentifier"
                          autocomplete="off"
                          class="text-input-style "
                          variant="filled"
                          placeholder="Reference Numbers"
                          density="compact"
                          hide-details="auto"
                          @update:model-value="debouncedSearch()"
                        />
                      </th>
                      <th
                        v-if="canShowColumn('chequeReceiptNumber')"
                        scope="chequeReceiptNumber"
                      >
                        <v-text-field
                          id="chequeReceiptNumber"
                          v-model.trim="chequeReceiptNumber"
                          autocomplete="off"
                          class="text-input-style "
                          variant="filled"
                          placeholder="Cheque Number"
                          density="compact"
                          hide-details="auto"
                          @update:model-value="debouncedSearch()"
                        />
                      </th>
                      <th
                        v-if="canShowColumn('remainingAmount')"
                        scope="remainingAmount1"
                      >
                        <v-text-field
                          id="remainingAmount1"
                          v-model.trim="remainingAmount"
                          autocomplete="off"
                          class="text-input-style "
                          variant="filled"
                          placeholder="Balance"
                          density="compact"
                          hide-details="auto"
                          @update:model-value="debouncedSearch()"
                        />
                      </th>
                      <th>
                        <v-btn
                          v-if="!searchParamsExist"
                          variant="outlined"
                          color="primary"
                          class="action-btn clear-filter-button"
                          @click="clearFilter"
                        >
                          <span class="clear-filter cursor-pointer">
                            Clear Filters
                            <v-icon
                              size="small"
                              color="primary"
                            >mdi-close</v-icon>
                          </span>
                        </v-btn>
                      </th>
                    </tr>
                  </template>
                  <template #item="{ item }">
                    <transition name="slide-fade">
                      <tr
                        v-if="!isLoading"
                        class="rs-search-result"
                      >
                        <td v-if="canShowColumn('routingSlipNumber')">
                          {{ item.number ? item.number : '-' }}
                        </td>
                        <td v-if="canShowColumn('receiptNumber')">
                          {{
                            item.paymentAccount &&
                              item.paymentAccount.paymentMethod === 'CASH'
                              ? item.payments &&
                                item.payments[0] &&
                                item.payments[0].chequeReceiptNumber
                              : '-'
                          }}
                        </td>
                        <td v-if="canShowColumn('accountName')">
                          {{ item.paymentAccount.accountName ? item.paymentAccount.accountName : '-' }}
                        </td>
                        <td v-if="canShowColumn('createdName')">
                          {{ item.createdName ? item.createdName : '-' }}
                        </td>
                        <td v-if="canShowColumn('date')">
                          {{
                            item.routingSlipDate
                              ? formatDisplayDate(
                                item.routingSlipDate,
                                'DDD'
                              )
                              : '-'
                          }}
                        </td>
                        <td v-if="canShowColumn('status')">
                          <span
                            :class="statusListColor(item.status)"
                            data-test="label-status"
                          >{{
                            getStatusLabel(item.status)
                              ? getStatusLabel(item.status)
                              : '-'
                          }}</span>
                        </td>
                        <td v-if="canShowColumn('businessIdentifier')">
                          <span
                            v-if="
                              formatFolioResult(item).length > 0 &&
                                !showExpandedFolio.includes(item.id)
                            "
                            class="cursor-pointer"
                            @click="toggleFolio(item.id)"
                          >
                            {{ formatFolioResult(item)[0] }}
                            <v-icon
                              v-if="formatFolioResult(item).length > 1"
                              size="small"
                              color="primary"
                            >
                              mdi-menu-down</v-icon></span>
                          <template v-if="showExpandedFolio.includes(item.id)">
                            <div
                              v-for="(folio, index) in formatFolioResult(item)"
                              :key="index"
                              :class="index === 0 ? 'cursor-pointer' : ''"
                              @click="index === 0 ? toggleFolio(item.id) : ''"
                            >
                              <span>
                                {{ folio }}
                                <v-icon
                                  v-if="index === 0"
                                  size="small"
                                  color="primary"
                                >
                                  mdi-menu-up</v-icon></span>
                            </div>
                          </template>
                        </td>
                        <td v-if="canShowColumn('chequeReceiptNumber')">
                          <template
                            v-if="
                              item.paymentAccount &&
                                item.paymentAccount.paymentMethod ===
                                PaymentMethods.CHEQUE
                            "
                          >
                            <span
                              v-if="
                                item.payments &&
                                  item.payments.length > 0 &&
                                  !showExpandedCheque.includes(
                                    item.payments[0].chequeReceiptNumber
                                  )
                              "
                              class="cursor-pointer"
                              @click="
                                toggleCheque(
                                  item.payments[0].chequeReceiptNumber
                                )
                              "
                            >
                              {{ item.payments[0].chequeReceiptNumber }}
                              <v-icon
                                v-if="item.payments.length > 1"
                                size="small"
                                color="primary"
                              >
                                mdi-menu-down</v-icon></span>
                            <template
                              v-if="
                                showExpandedCheque.includes(
                                  item.payments[0].chequeReceiptNumber
                                )
                              "
                            >
                              <div
                                v-for="(payment, index) in item.payments"
                                :key="index"
                                :class="index === 0 ? 'cursor-pointer' : ''"
                                @click="
                                  index === 0
                                    ? toggleCheque(
                                      item.payments[0].chequeReceiptNumber
                                    )
                                    : ''
                                "
                              >
                                <span>
                                  {{ payment.chequeReceiptNumber }}
                                  <v-icon
                                    v-if="index === 0"
                                    size="small"
                                    color="primary"
                                  >
                                    mdi-menu-up</v-icon></span>
                              </div>
                            </template>
                          </template>
                          <template v-else>
                            -
                          </template>
                        </td>
                        <td
                          v-if="canShowColumn('remainingAmount')"
                          class="text-right"
                        >
                          <span class="font-weight-bold text-end">
                            {{
                              item.remainingAmount
                                ? appendCurrencySymbol(item.remainingAmount.toFixed(2))
                                : '-'
                            }}
                          </span>
                        </td>
                        <td class="action text-right">
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
                  <template #bottom />
                </v-data-table>
              </transition>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { appendCurrencySymbol, formatDisplayDate, statusListColor } from '@/util'
import DateRangeFilter from '@/components/common/DateRangeFilter.vue'
import { PaymentMethods } from '@/util/constants'
import SearchColumnFilterComponent from '@/components/common/SearchColumnFilterComponent.vue'
import StatusList from '@/components/common/StatusList.vue'
import { useDashboard } from '@/composables/Dashboard'
import { useSearch } from '@/composables/Dashboard/useSearch'

const props = withDefaults(defineProps<{
  isLibraryMode?: boolean
}>(), {
  isLibraryMode: false
})

const { addRoutingSlip } = useDashboard() // Adjust based on actual usage
const {
  headerSearch,
  displayedHeaderSearch,
  status,
  routingSlipNumber,
  receiptNumber,
  dateFilter,
  businessIdentifier,
  accountName,
  remainingAmount,
  chequeReceiptNumber,
  searchRoutingSlipResult,
  searchNow,
  debouncedSearch,
  canShowColumn,
  getStatusLabel,
  searchParamsExist,
  clearFilter,
  formatFolioResult,
  showExpandedFolio,
  showExpandedCheque,
  toggleFolio,
  toggleCheque,
  isLoading,
  navigateTo,
  fasUrl,
  initiator,
  handleDateFilterApplied
} = useSearch(props)
</script>

<style lang="scss">
@import '$assets/scss/theme.scss';
@import '$assets/scss/search.scss';
</style>
