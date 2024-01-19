<template>
  <div class="mb-4">
    <span
      v-if="siNumber !== ''"
      class="font-weight-bold"
    >
      {{ siNumber }}. </span>
    <router-link
      :to="navigateTo()"
      class="font-weight-bold"
    >
      {{ routingSlipNumber }}
    </router-link>
    <span>
      - Routing slip created date:
      <span
        data-test="text-created-date"
        class="font-weight-bold"
      >{{
        formatDisplayDate(createdDate)
      }}</span></span>
  </div>
</template>
<script setup lang="ts">
import { formatDisplayDate } from '@/util'
import { useLinkedRoutingSlipDetails } from '@/composables/ViewRoutingSlip'

const props = withDefaults(defineProps<{
  siNumber?: string
  routingSlipNumber: string
  createdDate: Date | string
  parentRoutingSlipNumber?: string
}>(),
{
  siNumber: '',
  routingSlipNumber: '',
  createdDate: '',
  parentRoutingSlipNumber: null
})

const { navigateTo } = useLinkedRoutingSlipDetails(props)
</script>

<style lang="scss" scoped>
.slip-status {
  text-transform: capitalize;
}
.row + .row {
  margin-top: 7px !important;
}
.status-list {
  max-width: 400px;
}
</style>
