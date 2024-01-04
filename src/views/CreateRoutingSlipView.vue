<template>
  <div class="home">
    <create-routing-slip/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator'
import { CreateRoutingSlip } from '@/components/RoutingSlip'

@Component({
  components: {
    CreateRoutingSlip
  }
})
export default class CreateRoutingSlipView extends Vue {}
</script>
