<template>
  <v-container class="view-container">
    <v-row>
      <v-col>
        <header class="view-header flex-column mb-0">
          <div class="d-flex justify-space-between" :class="{'flex-column': isXs}">
            <div>
              <h1 class="view-header__title">FAS Staff Dashboard</h1>
              <p  :class="{'mb-16': isXs}">
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
import { computed, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import Search from '@/components/Dashboard/Search.vue'
import DailyReport from '@/components/Dashboard/DailyReport.vue'

const { t } = useI18n()
const vuetify = inject('vuetify') as any // Inject the Vuetify instance
const isXs = computed(() => vuetify.breakpoint.xs)
</script>
<style lang="scss" scoped>
.view-heade {
  flex-direction: colum;
}
</style>
