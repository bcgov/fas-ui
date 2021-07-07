<template>
  <v-row>
    <v-col>
      <v-card class="pa-6">
        <h4>Search for Routing Slip</h4>
        <p class="mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
          porttitor sem.
        </p>

        <v-form>
          <v-row dense class="row-margin">
            <v-col sm="3" cols="12">
              <v-select
                :items="categoryList"
                v-model="category"
                filled
                item-text="name"
                item-value="value"
                return-object
                label="Select a Search Category"
              ></v-select>
            </v-col>
            <v-col sm="8" colsz="12">
              <v-text-field
                v-model="searchModal"
                filled
                :label="searchLabel"
                required
              ></v-text-field
            ></v-col>
            <v-col sm="1" cols="12">
              <v-btn class=" button-search" large dark color="primary">
                <v-icon dark large>
                  mdi-magnify
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters class="mb-4">
            <v-col sm="12">
              <span
                color="primary"
                class="advanced-search"
                @click="toggleAdvanceSearch()"
                data-test="btn-advanced-search"
                >Advanced Search
                <v-icon color="primary" v-if="showAdvanceSearch"
                  >mdi-menu-up</v-icon
                >
                <v-icon color="primary" v-else>mdi-menu-down</v-icon>
              </span>
            </v-col>
          </v-row>
          <transition name="slide-fade">
            <v-row
              dense
              class="row-margin"
              v-if="showAdvanceSearch"
              data-test="div-advanced-search"
            >
              <v-col sm="4" cols="12">
                <DateRangeFilter
                  :dateFilterProp="searchDate"
                  @emitDateFilter="applyDateFilter($event)"
                >
                </DateRangeFilter>
              </v-col>
              <v-col sm="4" cols="12">
                <v-select
                  :items="statusList"
                  v-model="statusModal"
                  filled
                  item-text="name"
                  item-value="value"
                  return-object
                  label="Status"
                ></v-select>
              </v-col>
              <v-col sm="4" cols="12">
                <v-text-field
                  v-model="totalAmount"
                  filled
                  label="Total Amount"
                  required
                  data-test="input-total-amount"
                ></v-text-field>
              </v-col>
            </v-row>
          </transition>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { useSearch } from '@/composables/Dashboard/useSearch'
import DateRangeFilter from '@/components/common/DateRangeFilter.vue'

@Component({
  setup () {
    const {
      categoryList,
      category,
      searchLabel,
      searchModal,
      statusList,
      statusModal,
      totalAmount,
      searchDate,
      toggleAdvanceSearch,
      showAdvanceSearch,
      applyDateFilter
    } = useSearch()
    return {
      categoryList,
      category,
      searchLabel,
      searchModal,
      statusList,
      statusModal,
      totalAmount,
      searchDate,
      toggleAdvanceSearch,
      showAdvanceSearch,
      applyDateFilter
    }
  },
  components: {
    DateRangeFilter
  }
})
export default class Search extends Vue {

}
</script>
<style lang="scss" scoped>
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
</style>
