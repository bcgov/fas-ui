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

@Component({
  components: {
    Search
  }
})
export default class Dashboard extends Vue {}
</script>
<style lang="scss" scoped>
.view-heade {
  flex-direction: colum;
}
</style>
