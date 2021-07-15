<template>
  <div>
    <v-btn
      large
      outlined
      class="px-6"
      color="primary"
      @click="print()"
      data-test="print-routing-slip"
    >
      <span>Print Routing Slip<v-icon class="ml-2">mdi-printer</v-icon></span>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PrintRoutingSlip extends Vue {}
</script>
<style lang="scss" scoped>
@import '$assets/scss/theme.scss';
</style>
