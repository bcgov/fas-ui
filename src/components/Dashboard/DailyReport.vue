<template>
  <div class="text-center daily-report">
    <v-menu
      v-model="showCalendar"
      :close-on-content-click="false"
      :nudge-left="200"
      offset-y
      z-index="1"
    >
      <template #activator="{ props }">
        <v-btn
          v-can:fas_reports.hide
          v-bind="props"
          class="font-weight-bold"
          size="large"
          dark
          color="primary"
          data-test="btn-daily-report"
        >
          Daily Report
          <v-icon
            dark
            size="small"
            class="ml-2 font-weight-bold"
          >
            mdi-calendar
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class=" text-body-1 font-weight-bold ml-3"
          data-test="title-daily-report"
        >
          Select Daily Report Date:
        </v-card-title>
        <v-card-text class="mx-4">
          <v-date-picker
            v-model="selectedDate"
            data-test="date-date-picker"
            elevation="5"
            :max="maxDate"
            color="primary"
          />
        </v-card-text>

        <v-card-actions class="pt-0 pb-3">
          <v-spacer />
          <v-btn
            color="primary"
            class="font-weight-bold"
            variant="text"
            :loading="isDownloading"
            data-test="btn-download-report"
            :disabled="selectedDate == ''"
            @click="getDailyReport"
          >
            Download Report
          </v-btn>
          <v-btn
            variant="text"
            data-test="btn-cancel"
            @click="toggleCalendar(false)"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { useDailyReport } from '@/composables/Dashboard'
import { can as vCan } from '@/directives/can'

const {
  selectedDate,
  getDailyReport,
  showCalendar,
  isDownloading,
  maxDate,
  toggleCalendar
} = useDailyReport()

</script>
<style lang="scss" scoped>
.view-heade {
  flex-direction: colum;
}
</style>
<style lang="scss">
.v-date-picker-title__date > div {
  font-size: 24px !important;
  font-weight: 700;
}
</style>
