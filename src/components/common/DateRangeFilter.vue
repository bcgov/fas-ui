<template>
  <!-- <v-menu
    v-model="showDateFilter"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="auto"
  >
    <template #activator="{ props }">
      <v-text-field
        v-model="dateRangeSelectedDisplay"
        append-inner-icon="mdi-calendar-range"
        readonly
        v-bind="props"
        variant="filled"
        data-test="input-date-picker"
        class="primary-icon"
      />
    </template>
    <v-card class="date-range-container d-flex">
      <div
        class="date-range-options d-flex flex-column justify-space-between flex-grow-0 pb-6 pt-3"
      >
        <v-list
          density="compact"
          class="py-0"
        >
          <v-list-item
            v-for="(filterRange, i) in dateFilterRanges"
            :key="i"
            class="py-2 px-6"
            :value="filterRange"
            @click="dateFilterChange(i)"
          >
            <v-list-item-title
              v-model="dateFilterSelectedIndex"
              class="font-weight-bold px-1"
              v-text="filterRange.label"
            />
          </v-list-item>
        </v-list>
        <div class="date-filter-btns px-6 mt-4 d-flex flex-end">
          <v-btn
            size="large"
            color="primary"
            class="font-weight-bold flex-grow-1 apply-btn"
            :disabled="!isApplyFilterBtnValid"
            @click="applyDateFilter"
          >
            Apply
          </v-btn>
          <v-btn
            size="large"
            variant="outlined"
            color="primary"
            class="flex-grow-1 ml-2 cancel-btn"
            @click="cancelDateFilter()"
          >
            Cancel
          </v-btn>
        </div>
      </div>
      <div class="date-range-calendars pb-6">
        <div
          class="date-range-label py-6 mx-6 mb-3"
          v-html="showDateRangeSelected"
        />
      </div>
    </v-card>
  </v-menu> -->
  <!-- <date-range-picker
    date-range={
    startDate:
    null,
    endDate:
    null
    }
  /> -->
</template>

<script setup lang="ts">
// this is just took from auth-web
// import DateRangePicker from 'vue3-daterange-picker'
import { useDateRange } from '@/composables/common'

const props = withDefaults(defineProps<{
  modelValue: any
  label: string
}>(), {
  modelValue: [],
  label: 'Select Date Range'
})
const emits = defineEmits<{
}>()

const {
  dateFilterRanges,
  dateRangeSelected,
  dateFilterSelectedIndex,
  dateRangeSelectedDisplay,
  showDateFilter,
  pickerDate,
  pickerMonthYear,
  dateFilterChange,
  isApplyFilterBtnValid,
  dateClick,
  applyDateFilter,
  showDateRangeSelected,
  cancelDateFilter
} = useDateRange(props, emits)
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

<style lang="scss">
  .v-icon.v-icon.v-icon--link {
    cursor: pointer !important;
  }
  .primary-icon .v-icon {
    color: #1669bb
  }
  .hide-title > div:first-child {
    display: none;
  }
</style>
