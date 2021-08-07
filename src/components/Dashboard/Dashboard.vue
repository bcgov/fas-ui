<template>
  <v-container class="view-container">
    <v-row>
      <v-col>
        <header class="view-header flex-column mb-0">
          <h1 class="view-header__title">FAS Staff Dashboard</h1>
          <p class="mb-15">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
            porttitor sem.
          </p>
          <div>
            <!-- <h2>Search for Routing Slip</h2> -->
            <h2>Search for Routing Slip</h2>
            <p class="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              at porttitor sem.
            </p>
          </div>
          <v-row class="d-flex flex-row justify-space-between align-center">
            <v-col cols="4">
              <v-btn
                class="font-weight-bold"
                large
                dark
                color="primary"
                @click="addRoutingSlip"
                v-can:fas_create.hide
              >
                <v-icon dark small class="mr-2 font-weight-bold">
                  mdi-plus
                </v-icon>
                Add New Routing Slip
              </v-btn>
            </v-col>
            <v-col cols="4">
              <search-column-filter-component
                hide-details>
              </search-column-filter-component>
            </v-col>
          </v-row>
        </header>

        <div>
          <Search />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Search from '@/components/Dashboard/Search.vue'
import SearchColumnFilterComponent from '@/components/common/SearchColumnFilterComponent.vue'
import { useDashboard } from '@/composables/Dashboard'

@Component({
  components: {
    Search,
    SearchColumnFilterComponent
  },
  setup (_, context) {
    const { addRoutingSlip } = useDashboard(_, context)
    return {
      addRoutingSlip
    }
  }
})
export default class Dashboard extends Vue {}
</script>
<style lang="scss" scoped>
.view-heade {
  flex-direction: colum;
}
</style>
