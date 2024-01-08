<template>
  <div class="staff-comment">
    <!-- TODO UNCOMMENT THIS -->
    <!-- <StaffComments  :url="url" :axios="axios" :businessId="routingSlipNumber" :key="routingSlipNumber" maxLength="2000"/> -->
  </div>
</template>
<script setup lang="ts">
import { StaffComments } from '@bcrs-shared-components/staff-comments'
import axios from '@/util/http-util'
import ConfigHelper from '@/util/config-helper'
import { computed } from 'vue'

const props = defineProps<{
  routingSlipNumber: string,
}>()

const url = computed(() => {
  return `${ConfigHelper.getFasAPIURL()}/routing-slips/${props.routingSlipNumber}/comments`
})
</script>
<style lang="scss" scoped>
.staff-comment{
  padding-left:-5px
}
</style>
