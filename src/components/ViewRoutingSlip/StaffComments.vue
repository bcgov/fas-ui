<template>
  <div class="staff-comment">
    <StaffComments
      :key="routingSlipNumber"
      :url="url"
      :axios="axios"
      :businessId="routingSlipNumber"
      :maxLength="2000"
    />
  </div>
</template>
<script setup lang="ts">
import ConfigHelper from '@/util/config-helper'
import StaffComments from '@/components/common/StaffComments.vue'
import axios from '@/util/http-util'
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
