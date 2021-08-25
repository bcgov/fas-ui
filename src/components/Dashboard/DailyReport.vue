<template>
  <div class="text-center">
    <v-menu
      v-model="showCalendar"
      :close-on-content-click="false"
      :nudge-left="200"
      offset-y
      z-index="1"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="font-weight-bold"
          large
          dark
          color="primary"
          v-can:fas_reports.hide
          v-bind="attrs"
          v-on="on"
        >
          Daily Report
          <v-icon dark small class="ml-2 font-weight-bold">
            mdi-calendar
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class=" body-1 font-weight-bold"
          >Select Daily Report Date:</v-card-title
        >
        <v-card-text class="mx-4">
          <v-date-picker
            v-model="selectedDate"
            v-bind="$attrs"
            v-on="$listeners"
            data-test="date-date-picker"
            elevation="5"
          ></v-date-picker>
        </v-card-text>

        <v-card-actions class="pt-3">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="font-weight-bold"
            text
            @click="getDailyReport"
            :loading="isDownloading"
          >
            View Report
          </v-btn>
          <v-btn text @click="showCalendar = false">
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
      isDownloading
    } = useDailyReport()
    return {
      selectedDate,
      getDailyReport,
      showCalendar,
      isDownloading
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
