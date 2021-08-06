<template>
  <v-menu
    v-model="showDateFilter"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:activator="{}">
      <!-- UI control that is displayed clicking on which menu is displayed -->
      <v-text-field
        v-model="dateRangeSelectedDisplay"
        :label="label"
        append-icon="mdi-calendar-range"
        readonly
        v-bind="$attrs"
        v-on="$listeners"
        filled
        data-test="input-date-picker"
      ></v-text-field>
    </template>
    <!-- the menu consists of list of buttons on left and date picker on right -->
    <v-card class="date-range-container d-flex">
      <div
        class="date-range-options d-flex flex-column justify-space-between flex-grow-0 pb-6 pt-3"
      >
        <v-list dense class="py-0">
          <v-list-item-group
            v-model="dateFilterSelectedIndex"
            color="primary"
            @change="dateFilterChange"
          >
            <v-list-item
              class="py-2 px-6"
              v-for="(filterRange, i) in dateFilterRanges"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold px-1"
                  v-text="filterRange.label"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
        <div class="date-filter-btns px-6 mt-4 d-flex flex-end">
          <v-btn
            large
            color="primary"
            class="font-weight-bold flex-grow-1 apply-btn"
            :disabled="!isApplyFilterBtnValid"
            @click="applyDateFilter"
          >
            Apply
          </v-btn>
          <v-btn
            large
            outlined
            color="primary"
            class="flex-grow-1 ml-2 cancel-btn"
            @click="showDateFilter = false"
          >
            Cancel
          </v-btn>
        </div>
      </div>
      <div class="date-range-calendars pb-6">
        <div
          class="date-range-label py-6 mx-6 mb-3"
          v-html="showDateRangeSelected"
        ></div>
        <v-date-picker
          color="primary"
          width="400"
          class="text-center"
          v-model="dateRangeSelected"
          no-title
          range
          v-bind="$attrs"
          v-on="$listeners"
          :picker-date="pickerDate"
          @click:date="dateClick"
          data-test="date-date-picker"
          hide-details="auto"
        ></v-date-picker>
      </div>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
// this is just took from auth-web
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { useDateRange } from '@/composables/common'

@Component({
  setup (props, context) {
    const {
      dateFilterRanges,
      dateRangeSelected,
      dateFilterSelectedIndex,
      dateRangeSelectedDisplay,
      dateFilterSelected,
      showDateFilter,
      pickerDate,
      dateFilterChange,
      isApplyFilterBtnValid,
      dateClick,
      applyDateFilter,
      showDateRangeSelected
    } = useDateRange(props, context)
    return {
      dateFilterRanges,
      dateRangeSelected,
      dateFilterSelectedIndex,
      dateRangeSelectedDisplay,
      dateFilterSelected,
      showDateFilter,
      pickerDate,
      dateFilterChange,
      isApplyFilterBtnValid,
      dateClick,
      applyDateFilter,
      showDateRangeSelected
    }
  }
})
export default class DateRangeFilter extends Vue {
  @Prop({ default: () => [] }) value: string[]
  @Prop({ default: 'Select Date Range' }) label: string
}
</script>

<style lang="scss" scoped>
.date-filter-container {
  .date-range-list {
    border-right: 1px solid #999;
    padding-right: 0;
  }
}

.date-range-options {
  width: 15rem;
  border-radius: 0 !important;
  border-right: 1px solid var(--v-grey-lighten1);
}

.date-range-label {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--v-grey-lighten1);
}

.date-picker-disable {
  .v-date-picker-table {
    pointer-events: none;
  }
}

.date-range-label strong {
  margin-right: 0.25rem;
}

.date-range-calendars {
  .v-picker.v-card {
    box-shadow: none !important;
  }
}
.date-range-btn {
  min-height: 57px !important;
}
</style>
