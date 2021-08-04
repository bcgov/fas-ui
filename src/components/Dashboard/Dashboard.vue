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
          <div class="d-flex justify-space-between align-center">
            <div>
              <!-- <h2>Search for Routing Slip</h2> -->
              <h2>Search for Routing Slip</h2>
              <p class="mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                at porttitor sem.
              </p>
            </div>

            <v-btn
              class="button-search font-weight-bold"
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
import { Component, Vue } from 'vue-property-decorator'
import Search from '@/components/Dashboard/Search.vue'
import { useDashboard } from '@/composables/Dashboard'

@Component({
  components: {
    Search
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
