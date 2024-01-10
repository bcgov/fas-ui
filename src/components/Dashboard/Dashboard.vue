<template>
  <v-container class="view-container">
    <v-row>
      <v-col>
        <header class="view-header flex-column mb-0">
          <div
            class="d-flex justify-space-between"
            :class="{'flex-column': xs}"
          >
            <div>
              <h1 class="view-header__title">
                FAS Staff Dashboard
              </h1>
              <p :class="{'mb-16': xs}">
                {{ t('dashboardSubText') }}
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

<script setup lang="ts">
import DailyReport from '@/components/Dashboard/DailyReport.vue'
import Search from '@/components/Dashboard/Search.vue'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'

const { xs } = useDisplay()

const { t } = useI18n()
</script>
<style lang="scss" scoped>
.view-heade {
  flex-direction: colum;
}
</style>
