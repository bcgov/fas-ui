<template>
  <div class="text-center daily-report">
    <v-menu
      v-model="showCalendar"
      :close-on-content-click="false"
      :nudge-left="200"
      offset-y
      z-index="1"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="font-weight-bold"
          large
          dark
          color="primary"
          v-can:fas_reports.hide
          v-on="on"
          data-test="btn-daily-report"
        >
          Daily Report
          <v-icon dark small class="ml-2 font-weight-bold">
            mdi-calendar
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class=" body-1 font-weight-bold ml-3"
          data-test="title-daily-report"
          >Select Daily Report Date:</v-card-title
        >
        <v-card-text class="mx-4">
          <v-date-picker
            v-model="selectedDate"
            v-bind="$attrs"
            v-on="$listeners"
            data-test="date-date-picker"
            elevation="5"
            :max="maxDate"
          ></v-date-picker>
        </v-card-text>

        <v-card-actions class="pt-0 pb-3">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="font-weight-bold"
            text
            @click="getDailyReport"
            :loading="isDownloading"
            data-test="btn-download-report"
          >
            Download Report
          </v-btn>
          <v-btn text @click="toggleCalendar(false)" data-test="btn-cancel">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Search from '@/components/Dashboard/Search.vue'
import can from '@/directives/can'
import { useDailyReport } from '@/composables/Dashboard'

@Component({
  components: {
    Search
  },
  directives: {
    can
  },
  setup () {
    const {
      selectedDate,
      getDailyReport,
      showCalendar,
      isDownloading,
      maxDate,
      toggleCalendar
    } = useDailyReport()
    return {
      selectedDate,
      getDailyReport,
      showCalendar,
      isDownloading,
      maxDate,
      toggleCalendar
    }
  }
})
export default class DailyReport extends Vue {}
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
