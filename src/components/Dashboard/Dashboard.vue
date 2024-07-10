<template>
  <v-container class="view-container">
    <v-row>
      <v-col>
        <header class="view-header flex-column mb-0">
          <div class="d-flex justify-space-between" :class="{'flex-column': $vuetify.breakpoint.xs}">
            <div>
              <h1 class="view-header__title">FAS Staff Dashboard</h1>
              <p :class="{'mb-16': !$vuetify.breakpoint.xs}">
                {{ $t('dashboardSubText') }}
              </p>
            </div>

            <DailyReport />
          </div>
        </header>
        <div>
          <Search />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Search from '@/components/Dashboard/Search.vue'
import DailyReport from '@/components/Dashboard/DailyReport.vue'
import can from '@/directives/can'

export default defineComponent({
  components: {
    Search,
    DailyReport
  },
  directives: {
    can
  }
})
</script>

<style lang="scss" scoped>
  .view-header {
    flex-direction: column;
  }
</style>
