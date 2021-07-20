<template>
  <div >
    <h3 data-test="title">03.Routing Slip Transaction</h3>
    <div class="my-3">
      <p class="ma-0 align-self-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at
        porttitor sem.
      </p>
      <v-btn
      large
      color="primary"
      data-test="btn-add-fund"
      class="mt-2"
      >
        <v-icon class="mr-1">mdi-plus</v-icon>
        <span class="font">Add Transaction Manually</span>
      </v-btn>
    </div>
    <v-card class="d-flex flex-column mt-2 py-7 pl-7">
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  setup () {
  }
})
export default class RoutingSlipTransaction extends Vue {}

</script>
